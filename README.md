## Attachment_Handler
This project is written in JavaScript run in Adobe Acrobat Reader to help Clinical Engineering Technicians to upload their pdf documents.

## Motivation
First, it was a challenge for people to locate appropriate folder and rename the file name in accordance with naming convention policy at Clinical Engineering Branch.
Second, Supervisors had been having a hard time to look for the documents because of wrong path and file name.

## Build status
Currently, this code is in use.

## Code style
Unfortunately, no style guide is applied to this project.

## Screenshots
[![js-standard-style](https://media-exp1.licdn.com/media-proxy/ext?w=715&h=437&f=n&hash=wqLRyn7gDkG4HlrQTzd8baJweek%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6jnhodx1Ey9KGTqAGj6E5DQJHUA3L0CHH05IbfPWjocJaKKOf39kBDKn8FjQAweL61STTgG464KIzvLth4jcHhcMP5agYUbhl4lWdI)]

## Features
Validate code version, automatically renaming pdf file based on work order number, ECN, and type, handling duplication(overwrite, adding number after file name up to 100, and cancel)

## Installation
Download and place those files in Acrobat Reader JavaScript folder.

## API Reference
Used Acrobat Reader API reference.

## Tests
In order to debug and test, I used interactive js console in Adobe Acrobat Reader. Also, the folders for the destination are required.

## How to use?
Once you place those code in Acrobat Reader JavaScript folder, it will be loaded when Acrobat Reader opens, and it will add new Menus to upload attachment. 

