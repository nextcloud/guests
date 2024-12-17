# SPDX-FileCopyrightText: 2017 ownCloud GmbH
# SPDX-License-Identifier: AGPL-3.0-only
Feature: Guests

Background:
	Given using api version "1"
	And using new dav path

Scenario: Creating a guest user works fine
	Given As an "admin"
	When user "admin" creates guest user "guest" with email "guest@example.com"
	Then the HTTP status code should be "201"
	And check that user "guest" is a guest

Scenario: A guest user cannot upload files
	Given As an "admin"
	And user "admin" creates guest user "guest" with email "guest@example.com"
	And the HTTP status code should be "201"
	When User "guest_example_com" uploads file "data/textfile.txt" to "/myfile.txt"
	Then the HTTP status code should be "401"

Scenario: Check that skeleton is properly set
	Given As an "admin"
	And user "user0" exists
	Then user "user0" should see following elements
		| /FOLDER/ |
		| /PARENT/ |
		| /PARENT/parent.txt |
		| /textfile0.txt |
		| /textfile1.txt |
		| /textfile2.txt |
		| /textfile3.txt |
		| /textfile4.txt |
		| /welcome.txt |

 Scenario: A created guest user can log in
	Given As an "admin"
	And user "user0" exists
	And user "admin" creates guest user "guest" with email "guest@example.com"
	And the HTTP status code should be "201"
	And check that user "guest" is a guest
	And file "/textfile1.txt" of user "user0" is shared with user "guest_example_com"
	When guest user "guest" sets its password
	Then the HTTP status code should be "200"
	And user "guest_example_com" should see following elements
		| /textfile1.txt |
