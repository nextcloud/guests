<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Guests\Test\Unit;

use OCA\Guests\Mail;
use OCP\Defaults;
use OCP\IURLGenerator;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\L10N\IFactory;
use OCP\Mail\IEMailTemplate;
use OCP\Mail\IMailer;
use OCP\Mail\IMessage;
use OCP\Server;
use OCP\Share\IShare;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class MailTest extends TestCase {
	private IMailer&MockObject $mailer;
	private IUserManager&MockObject $userManager;
	private ?IEMailTemplate $sentTemplate = null;
	private Mail $mail;

	protected function setUp(): void {
		parent::setUp();

		$this->mailer = $this->createMock(IMailer::class);
		$this->mailer->method('createEMailTemplate')
			->willReturnCallback(fn (string $emailId) => Server::get(IMailer::class)->createEMailTemplate($emailId));
		$message = $this->createMock(IMessage::class);
		$message->method('useTemplate')
			->willReturnCallback(function (IEMailTemplate $template) use ($message) {
				$this->sentTemplate = $template;
				return $message;
			});
		$this->mailer->method('createMessage')->willReturn($message);

		$sender = $this->createMock(IUser::class);
		$sender->method('getDisplayName')->willReturn('Alice Martin');
		$sender->method('getEMailAddress')->willReturn('alice@example.com');
		$guest = $this->createMock(IUser::class);
		$guest->method('getDisplayName')->willReturn('Jordan');
		$guest->method('getEMailAddress')->willReturn('jordan@partner.example');

		$this->userManager = $this->createMock(IUserManager::class);
		$this->userManager->method('get')->willReturnMap([
			['alice', $sender],
			['jordan@partner.example', $guest],
		]);
		$userSession = $this->createMock(IUserSession::class);
		$userSession->method('getUser')->willReturn($sender);

		$defaults = $this->createMock(Defaults::class);
		$defaults->method('getName')->willReturn('Nextcloud');

		$urlGenerator = $this->createMock(IURLGenerator::class);
		$urlGenerator->method('linkToRouteAbsolute')->willReturnMap([
			['core.lost.resetform', ['userId' => 'jordan@partner.example', 'token' => 'token'], 'https://cloud.example.com/reset'],
			['files.viewcontroller.showFile', ['fileid' => 42, 'direct' => 1], 'https://cloud.example.com/f/42'],
		]);

		$this->mail = new Mail(
			$userSession,
			$this->mailer,
			$defaults,
			Server::get(IFactory::class),
			$this->userManager,
			$urlGenerator,
		);
	}

	private function createShare(string $note, ?\DateTime $expiration): IShare&MockObject {
		$share = $this->createMock(IShare::class);
		$share->method('getTarget')->willReturn('/Budget.xlsx');
		$share->method('getNodeId')->willReturn(42);
		$share->method('getNote')->willReturn($note);
		$share->method('getExpirationDate')->willReturn($expiration);
		return $share;
	}

	public function testShareMail(): void {
		$share = $this->createShare("Can you check\nthe travel line?", new \DateTime('2026-11-15'));
		$this->mail->sendGuestInviteMail('alice', 'jordan@partner.example', 'token', 'en', $share);

		$this->assertSame('Alice Martin shared Budget.xlsx with you', $this->sentTemplate->renderSubject());
		$text = $this->sentTemplate->renderText();
		$this->assertStringContainsString('Alice Martin (alice@example.com)', $text);
		$this->assertStringContainsString("> Can you check\n> the travel line?", $text);
		$this->assertStringContainsString('Valid until: Nov 15, 2026', $text);
		$this->assertStringContainsString('Your login: jordan@partner.example', $text);
		$this->assertStringContainsString('Activate account: https://cloud.example.com/reset', $text);
		$this->assertStringContainsString('View share: https://cloud.example.com/f/42', $text);
	}

	public function testShareMailWithoutNoteAndExpiration(): void {
		$share = $this->createShare('', null);
		$this->mail->sendGuestInviteMail('alice', 'jordan@partner.example', 'token', 'en', $share);

		$text = $this->sentTemplate->renderText();
		$this->assertStringNotContainsString('Note', $text);
		$this->assertStringNotContainsString('Valid until', $text);
		$this->assertStringContainsString('Your login: jordan@partner.example', $text);
	}

	public function testInviteMail(): void {
		$this->mail->sendGuestInviteMail('alice', 'jordan@partner.example', 'token', 'en');

		$this->assertSame('Alice Martin invited you as a guest', $this->sentTemplate->renderSubject());
		$text = $this->sentTemplate->renderText();
		$this->assertStringContainsString('Alice Martin (alice@example.com)', $text);
		$this->assertStringContainsString('Your login: jordan@partner.example', $text);
		$this->assertStringContainsString('Activate account: https://cloud.example.com/reset', $text);
		$this->assertStringNotContainsString('View share', $text);
	}

	public function testRightToLeftLanguage(): void {
		$this->mail->sendGuestInviteMail('alice', 'jordan@partner.example', 'token', 'ar');

		$this->assertStringContainsString('lang="ar" xml:lang="ar" dir="rtl"', $this->sentTemplate->renderHtml());
	}
}
