function getStatus()
{
var readStatus = util.readFileIntoStream("/MAMCFS03/DEPT$/CEB/DMLSS/Version/Status");
var getStatus=util.stringFromStream(readStatus).replace(/^\s+|\s+$/g,"");
return getStatus;
}
function Version_checker()
{
var readVersion = util.readFileIntoStream("/MAMCFS03/DEPT$/CEB/DMLSS/Version/Version");
var theLastestVersion=util.stringFromStream(readVersion).replace(/^\s+|\s+$/g,"");
return theLastestVersion;
}

function Acceptance_Version_checker()
{
var readVersion_Acceptance = util.readFileIntoStream("/MAMCFS03/DEPT$/CEB/DMLSS/Version/Version_Acceptance");
var theLastestVersion_Acceptance=util.stringFromStream(readVersion_Acceptance).replace(/^\s+|\s+$/g,"");
return theLastestVersion_Acceptance;
}

function TMDE_Version_checker()
{
var readVersion_TMDE = util.readFileIntoStream("/MAMCFS03/DEPT$/CEB/DMLSS/Version/Version_TMDE");
var theLastestVersion_TMDE=util.stringFromStream(readVersion_TMDE).replace(/^\s+|\s+$/g,"");
return theLastestVersion_TMDE;
}

function Validate_Version()
{
var VV=app.alert("Your Attachment Handler is Outdated. Please Update the attachment Handler.\n     Your Attachment handler version : " + currentVersion +"\nPlease Follow steps:\n  1.Copy DMLSS_AH.ps1 file to your Desktop.\n  2. Right click the copied file on desktop.\n  3. click Run with PowerShell.\n  4. close Adobe Acrobat Reader.\nClick OK to locate DMLSS_AH_TMDE.ps1 file.\nIf you have any question or concern,\n please contact CEB System admin team.",1,1,"Version Check");
if (VV==1)
{
app.launchURL("file://N:/Release");
}
}

function Validate_Version_Acceptance()
{
var VV_Acceptance=app.alert("Your Acceptance Attachment Handler is Outdated. Please Update the attachment Handler.\n     Your Acceptance Attachment handler version : " + currentVersionAcceptance +"\nCurrent Acceptance Attachment handler version : " + Version_checker()+"\nPlease Follow steps:\n  1.Copy DMLSS_AH_Acceptance.ps1 file to your Desktop.\n  2. Right click the copied file on desktop.\n  3. click Run with PowerShell.\n  4. close Adobe Acrobat Reader.\nClick OK to locate DMLSS_AH_TMDE.ps1 file.\nIf you have any question or concern,\n please contact CEB System admin team.",1,1,"Version Check");
if (VV_Acceptance==1)
{
app.launchURL("file://N:/Release");
}
}

function Validate_Version_TMDE()
{
var VV_TMDE=app.alert("Your Acceptance Attachment Handler is Outdated. Please Update the attachment Handler.\n     Your TMDE Attachment handler version : " + currentVersionTMDE +"\nCurrent TMDE Attachment handler version : " + Version_checker()+"\nPlease Follow steps:\n  1.Copy DMLSS_AH_TMDE.ps1 file to your Desktop.\n  2. Right click the copied file on desktop.\n  3. click Run with PowerShell.\n  4. close Adobe Acrobat Reader.\nClick OK to locate DMLSS_AH_TMDE.ps1 file.\nIf you have any question or concern,\n please contact CEB System admin team.",1,1,"Version Check");
if (VV_TMDE==1)
{
app.launchURL("file://N:/Release");
}
}