var currentVersion="1.1";
app.addSubMenu({cName:"DMLSS", cParent:"File", nPos: 0})
app.addMenuItem({cName:"Attachment Handler", cParent: "DMLSS", nPos: 0, cExec: "AttachmentHandler(this)"});
var filepath = "";
function AttachmentHandler()
	{
	if(currentVersion!=Version_checker())
			{
			Validate_Version()
			}
	else
	{
		var dialog1 = { fpath: "", tpath: "", fpath_NOECN: "", WON_VAL: "", ECN_VAL: "",
		initialize: function(dialog) {
			//dialog.load({"ECNN":this.defECN});
			dialog.load({"rd01": true });
			this.TypeofAttn = true;
			dialog.enable({
				"rd01" : this.TypeofAttn,
				"rd02" : this.TypeofAttn,
				"rd03" : this.TypeofAttn,
				"rd04" : this.TypeofAttn,
				"rd05" : this.TypeofAttn,
				"rd06" : this.TypeofAttn,
			});
		},
		commit:function (dialog) {
			var results = dialog.store();
			this.WON_VAL=results["WONN"];
			this.ECN_VAL=results["ECNN"];
			this.fpath = results["WONN"]+"_ECN"+results["ECNN"]+"_"+this.getNumAttn(results)+".pdf";
			this.fpath_NOECN = results["WONN"]+"_"+this.getNumAttn(results)+".pdf";
			this.tpath=this.getNumAttn(results);
		}
		,
		getNumAttn: function (results) {
			for ( var i=1; i<=6; i++) {
				if ( results["rd0"+i] ) {
					switch (i) {
						case 1:
						var nAttns = "GPC";
						break;
						case 2:
						var nAttns = "Quote";
						break;
						case 3:
						var nAttns = "SR";
						break;
						case 4:
						var nAttns = "Invoice";
						break;
						case 5:
						var nAttns = "ECAT";
						break;
						case 6:
						var nAttns = results["ETCC"];
					}
				}
			};
			return nAttns;
		},
		description:
		{
			name: "Work Order Process",
			align_children: "align_row",
			width: 300,
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
									name: "Work Order Number: "
								},
								{
									item_id: "WONN",
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
									name: "ECN: "
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
									name: "GPC Form"
								},
								{
									type: "radio",
									item_id: "rd02",
									group_id: "rado",
									name: "Quote",
								},
								{
									type: "radio",
									item_id: "rd03",
									group_id: "rado",
									name: "Service Report",
								},
								{
									type: "radio",
									item_id: "rd04",
									group_id: "rado",
									name: "Invoice",
								},
								{
									type: "radio",
									item_id: "rd05",
									group_id: "rado",
									name: "ECAT",
								},
								{
									type: "radio",
									item_id: "rd06",
									group_id: "rado",
									name: "Other",
								},
								{
									item_id: "ETCC",
									type: "edit_text",
									alignment: "align_fill",
									width: 100,
									height: 20
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
	var retn = app.execDialog(dialog1);
	var FY=new Date().getFullYear();
	var ATTNTYPE=dialog1.tpath;
	if (ATTNTYPE != "GPC" && ATTNTYPE != "Quote" && ATTNTYPE != "SR" && ATTNTYPE != "Invoice" && ATTNTYPE != "ECAT")
	{
		ATTNTYPE="Others"
	}
	var savepath="/N/DMLSS/"+ATTNTYPE+"/"+FY+"/"+dialog1.fpath
	var savepath_NOECN="/N/DMLSS/"+ATTNTYPE+"/"+FY+"/"+dialog1.fpath_NOECN
	if( "ok" == retn)
	{
	while ("ok" == retn)
		{
			if (dialog1.WON_VAL != null & dialog1.WON_VAL.length == 12 & dialog1.ECN_VAL.length <= 6)
			{
				if (dialog1.WON_VAL == null | dialog1.ECN_VAL.length == 0)
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
					if (dialog1.ECN_VAL.length < 6)
					{
						var ECNfiller="0";
						var ECNstandard="";
						for (i=0; i <= 6-dialog1.ECN_VAL.length; i++)
						{
							ECNstandard=String(ECNfiller.repeat(i))+String(dialog1.ECN_VAL);
						}
						var savepathtemp=savepath.substring(savepath.indexOf("ECN"),savepath.lastIndexOf("_"))
						savepath=savepath.replace(savepathtemp,"ECN"+ECNstandard)
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
					if ( dialog1.WON_VAL.length != 12)
					{
						app.alert("The Work Order Number you entered: "+ dialog1.WON_VAL+"\n"+"Entered: "+dialog1.WON_VAL.length+"-digits"+"\n"+"Allowed: 12-digits")
						retn = app.execDialog(dialog1);
					}
					else if ( dialog1.ECN_VAL.length > 6)
					{
						app.alert("The ECN you entered: "+ dialog1.ECN_VAL+"\n"+"Entered: "+dialog1.ECN_VAL.length+"-digits"+"\n"+"Allowed: less than 6-digits")
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
