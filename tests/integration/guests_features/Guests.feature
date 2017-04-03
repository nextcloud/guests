Feature: Custom Groups

Background:
		Given using api version "1"
		And using new dav path

Scenario: Creating a guest user works fine
	Given As an "admin"
	When user "admin" creates guest user "guest" with email "guest@example.com"
	Then the HTTP status code should be "201"
	And user "admin" gets guests users they are
		| guest | guest@example.com |

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