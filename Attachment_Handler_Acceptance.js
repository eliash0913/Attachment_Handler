var currentVersionAcceptance="1.3"
app.addMenuItem({cName:"Attachment Handler for Acceptance", cParent: "DMLSS", nPos: 1, cExec: "Acceptance_AH(this)"});
var filepath = "";

function Acceptance_AH()
	{
		if(currentVersionAcceptance!=Acceptance_Version_checker())
			{
			Validate_Version_Acceptance()
			}
		else
		{
		var dialog1 = { fpath: "", tpath: "", fpath_NOECN: "", WOVF: "", ECVF: "", WOVT: "", ECVT: "",
		initialize: function(dialog) {
			//dialog.load({"ECNN":this.defECN});
			dialog.load({"rd01": true });
			this.TypeofAttn = true;
			dialog.enable({
				"rd01" : this.TypeofAttn,
				"rd02" : this.TypeofAttn,
				"rd03" : this.TypeofAttn,
				});
		},
		commit:function (dialog) {
			var results = dialog.store();
			this.WOVF=results["WONN"];
			this.WOVT=results["WONS"];
			this.ECVF=results["ECNN"];
			this.ECVT=results["ECNS"];
			// this.WOVT_PATH="_"+results["WONS"];
			// this.ECVT_PATH="_"+results["ECNS"];
			this.fpath = results["WONN"]+"_ECN"+results["ECNN"]+"_"+this.getNumAttn(results)+".pdf";
			this.mfpath = results["WONN"]+"_"+results["WONS"]+"_ECN"+results["ECNN"]+"_"+results["ECNS"]+"_"+this.getNumAttn(results)+".pdf";
			this.fpath_NOECN = results["WONN"]+"_"+this.getNumAttn(results)+".pdf";
			this.tpath=this.getNumAttn(results);
		}
		,
		getNumAttn: function (results) {
			for ( var i=1; i<=3; i++) {
				if ( results["rd0"+i] ) {
					switch (i) {
						case 1:
						var nAttns = "Acceptance";
						break;
						case 2:
						var nAttns = "Contract";
						break;
						case 3:
						var nAttns = "Warranty";
					  }
				}
			};
			return nAttns;
		},
		// rd05: function(dialog) {
		// 	this.ETCC = true;
		// }
		// ,
		description:
		{
			name: "Work Order Process",
			align_children: "align_row",
			width: 400,
			height: 200,
			elements:
			[
				{
					type: "cluster",
					name: "Work Order Information",
					align_children: "align_right",
					elements:
					[
						{
							type: "view",
							align_children: "align_row",
							elements:
							[
								{
									type: "static_text",
									name: "Work Order Number from: "
								},
								{
									item_id: "WONN",
									type: "edit_text",
									alignment: "align_fill",
									width: 100,
									height: 20
								}
								// },
								// {
								// 	type: "static_text",
								// 	name: "                      ",
								//   //width: 100,
								// 	// height: 20
								// }
							]
						},
						{
							type: "view",
							align_children: "align_row",
							elements:
							[
								{
									type: "static_text",
									name: "(Last four digits of WO#) to:"
								},
								{
									item_id: "WONS",
									type: "edit_text",
									alignment: "align_fill",
									width: 100,
									height: 20
								}
								//,
								// {
								// 	type: "static_text",
								// 	name: "Last 4 digits of WO#",
								// //	width: 100,
								// 	// height: 20
								// }
							]
						},
						{
							type: "view",
							align_children: "align_row",
							elements:
							[
								{
									type: "static_text",
									name: "ECN from: "
								},
								{
									item_id: "ECNN",
									type: "edit_text",
									alignment: "align_fill",
									width: 100,
									height: 20
								}
							]
						},
						{
							type: "view",
							align_children: "align_row",
							elements:
							[
								{
									type: "static_text",
									name: "to: "
								},
								{
									item_id: "ECNS",
									type: "edit_text",
									alignment: "align_fill",
									width: 100,
									height: 20
								}
							]
						},
						{
							type: "view",
							align_children: "align_fill",
							elements:
							[
								{
									type: "static_text",
									name: "Select the type of attchment: "
								},
								{
									type: "radio",
									item_id: "rd01",
									group_id: "rado",
									name: "Acceptance Document"
								},
								{
									type: "radio",
									item_id: "rd02",
									group_id: "rado",
									name: "Contract Document",
								},
								{
									type: "radio",
									item_id: "rd03",
									group_id: "rado",
									name: "Warranty Document",
								}
							]
						}
						,
						{
							type: "ok_cancel",
							ok_name: "Generate",
							cancel_name: "Cancel"
						}
					]
				}
			]
		}
	};
	var dialPath = {
		strName: "", initialize: function(dialog)
		{
			dialog.load({"usnm":this.strName});
		},
		commit: function(dialog)
		{
			var data = dialog.store();
			this.strName = data[ "usnm"];
		},
    description:
		{
			name: "File Path", elements:
			[
				{
					type: "view", elements:
					[
        		{ name: "Copy and Paste following to attachment in DMLSS:", type: "static_text", },
						{ item_id: "usnm", type: "edit_text", char_width: 50 },
						{ type: "ok", ok_name: "Close" },
					]
				},
			]
		}
	};
	//this.fpath = results["WONN"]+this.WOVT_PATH+"_ECN"+results["ECNN"]+this.ECVT_PATH+"_"+this.getNumAttn(results)+".pdf";
	var retn = app.execDialog(dialog1);
	var FY=new Date().getFullYear();
	var ATTNTYPE=dialog1.tpath;
	if (ATTNTYPE != "Acceptance" & ATTNTYPE != "Contract" & ATTNTYPE != "Warranty")
	{
		ATTNTYPE="Others"
	}


	if( "ok" == retn)
	{
		getMONTH=Number(dialog1.WOVF[4]+dialog1.WOVF[5]);
		var MONTH_DIR = new Array("1_JAN","2_FEB","3_MAR","4_APR","5_MAY","6_JUN","7_JUL","8_AUG","9_SEP","10_OCT","11_NOV","12_DEC");
		if (getMONTH > 12) {
			app.alert(getMONTH)
			app.alert("Please check your work order number.")
			return 0;
		}
		// app.alert(MONTH_DIR[getMONTH-1]);

		//app.alert(dialog1.WOVT);
		if (dialog1.WOVT.length == 0)
		{
			//dialog1.WOVT = "";
			var savepath="/N/DMLSS/Acceptance/"+ATTNTYPE+"Document"+"/"+FY+"/"+MONTH_DIR[getMONTH-1]+"/"+dialog1.fpath
		}
		else {
			var savepath="/N/DMLSS/Acceptance/"+ATTNTYPE+"Document"+"/"+FY+"/"+MONTH_DIR[getMONTH-1]+"/"+dialog1.mfpath
		}
			var savepath_NOECN="/N/DMLSS/Acceptance/"+ATTNTYPE+"Document"+"/"+FY+"/"+MONTH_DIR[getMONTH-1]+"/"+dialog1.fpath_NOECN
	validate_first=dialog1.WOVT.length == 4 | dialog1.WOVT.length == 0;
	while ("ok" == retn)
		{
			if (dialog1.WOVF != null & dialog1.WOVF.length == 12 & dialog1.ECVF.length <= 6 & validate_first)
			{
				if (dialog1.WOVF == null | dialog1.ECVF.length == 0)
				{
					var ECNVERIFICATION = app.alert("You didn't enter ECN.\nIf this Work Order does NOT have ECN, Click yes to continue", 1,1, "Confirmation")
					if (ECNVERIFICATION == 1)
					{
						try
						{
							this.saveAs({cPath: savepath_NOECN, bPromptToOverwrite: true});
						}
						catch(e)
						{
							savepath_NOECN=savepath_NOECN.replace(".pdf","2.pdf")
							for (i=2; i<100; i++)
							{
								try
								{
									this.saveAs({cPath: savepath_NOECN, bPromptToOverwrite: true});
									break;
								}
								catch(e)
								{
									savepath_NOECN=savepath_NOECN.replace(String(i)+".pdf",String(i+1)+".pdf")
								}
							}
						}
					}
					else
					{
						retn = app.execDialog(dialog1);
					}
				}
				else
				{
					validate_second=dialog1.ECVT.length <= 6 & dialog1.ECVT.length != 0;
					if (dialog1.ECVF.length <= 6 & validate_second)
					{
						var ECNfiller="0";
						var ECNstandardfrom="";
						var ECNstandardto="";
						for (i=0; i <= 6-dialog1.ECVF.length; i++)
						{
							ECNstandardfrom=String(ECNfiller.repeat(i))+String(dialog1.ECVF);
							//savepath=savepath.replace("ECN"+dialog1.ECVF,"ECN"+ECNstandardfrom)
						}
						for (i=0; i <= 6-dialog1.ECVT.length; i++)
						{
							ECNstandardto=String(ECNfiller.repeat(i))+String(dialog1.ECVT);
							//savepath=savepath.replace(dialog1.ECVT,ECNstandardto)
						}
							savepath=savepath.replace("ECN"+dialog1.ECVF+"_"+dialog1.ECVT,"ECN"+ECNstandardfrom+"_"+ECNstandardto)
						//var savepathtemp=savepath.substring(savepath.indexOf("ECN"),savepath.lastIndexOf("_"))
					}
					else if (dialog1.ECVF.length <= 6 & dialog1.ECVT.length == 0)
					{
						var ECNfiller="0";
						var ECNstandardfrom="";
						var ECNstandardto="";
						for (i=0; i <= 6-dialog1.ECVF.length; i++)
						{
							ECNstandardfrom=String(ECNfiller.repeat(i))+String(dialog1.ECVF);
							//savepath=savepath.replace("ECN"+dialog1.ECVF,"ECN"+ECNstandardfrom)
						}
						savepath=savepath.replace("ECN"+dialog1.ECVF,"ECN"+ECNstandardfrom)
					}
					try
					{
						//app.alert(savepath)
						this.saveAs({cPath: savepath, bPromptToOverwrite: true});
					}
					catch(e)
					{
						savepath=savepath.replace(".pdf","2.pdf")
						for (i=2; i<100; i++)
						{
							try
							{
								this.saveAs({cPath: savepath, bPromptToOverwrite: true});
								break;
							}
							catch(e)
							{
								savepath=savepath.replace(String(i)+".pdf",String(i+1)+".pdf")
							}
						}
					}
				}
				var temp_path=this.path;
				var temp_linkpath=temp_path.substring(temp_path.indexOf('DMLSS')).replace(/\//g,"\\");
				var linkpath="N:\\"+temp_linkpath;
				dialPath.strName=linkpath;
				var retn2 = app.execDialog(dialPath);
				break;
				}
				else
				{
					if ( dialog1.WOVF.length != 12)
					{
						app.alert("The Work Order Number you entered: "+ dialog1.WOVF+"\n"+"Entered: "+dialog1.WOVF.length+"-digits"+"\n"+"Allowed: 12-digits")
						retn = app.execDialog(dialog1);
					}
					else if ( dialog1.ECVF.length > 6)
					{
						app.alert("The ECN you entered: "+ dialog1.ECVF+"\n"+"Entered: "+dialog1.ECVF.length+"-digits"+"\n"+"Allowed: less than 6-digits")
						retn = app.execDialog(dialog1);
					}
					else if ( dialog1.WOVT.length != 4 | dialog1.WOVT.length != 0)
					{
						app.alert("The Last Four Digits of Work Order Number you entered: "+ dialog1.WOVT+"\n"+"Entered: "+dialog1.WOVT.length+"-digits"+"\n"+"Allowed: 4-digits")
						retn = app.execDialog(dialog1);
					}
					else if ( dialog1.ECNVT.length > 6)
					{
						app.alert("The ECN you entered: "+ dialog1.ECVT+"\n"+"Entered: "+dialog1.ECVT.length+"-digits"+"\n"+"Allowed: less than 6-digits")
						retn = app.execDialog(dialog1);
					}

					else
					{
						app.alert("You didn't enter any Work Order Number."+"\n\n"+"Please try again. Work Order Number must be 12-digits.")
						retn = app.execDialog(dialog1);
					}
				}
			}
		}
}
}
