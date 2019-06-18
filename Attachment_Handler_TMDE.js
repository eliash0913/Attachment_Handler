var currentVersionTMDE="1.4"
//app.addSubMenu({cName:"DMLSS", cParent:"File", nPos: 0})
app.addMenuItem({cName:"Attachment Handler for TMDE", cParent: "DMLSS", nPos: 2, cExec: "TMDE_AH(this)"});
var filepath = "";
function TMDE_AH()
	{
		if(currentVersionTMDE!=TMDE_Version_checker())
			{
			Validate_Version_TMDE()
			}
		else
		{
		var dialog1 = { fpath: "", tpath: "", cerdpath:"", fpath_generic: "", WON_VAL: "", ECN_VAL: "", MFR_VAL: "", CERD: "",
		initialize: function(dialog) {
			//dialog.load({"ECNN":this.defECN});
			dialog.load({"rd01": true });
			this.TypeofAttn = true;
			this.ETCC = true;

			dialog.enable({
				"rd01" : this.TypeofAttn,
				"rd02" : this.TypeofAttn,
				"rd03" : this.TypeofAttn,
				 "rd04" : this.TypeofAttn,
				// "rd05" : this.TypeofAttn,
				// "ETCC" : this.ETCC,
				});
		},
		commit:function (dialog) {
			var results = dialog.store();
			this.WON_VAL=results["WONN"];
			this.ECN_VAL=results["ECNN"];
			this.MFR_VAL=results["MFRR"];
			this.CERD=results["CERD"];
			this.cerdpath="ECN"+results["ECNN"]+"_"+results["CERD"]+"_"+this.getNumAttn(results)+".pdf";
			this.fpath = results["WONN"]+"_ECN"+results["ECNN"]+"_"+this.getNumAttn(results)+".pdf";
			var NEWDATE=new Date();
			var TOYEAR=String(NEWDATE.getFullYear());
			var TOMONTH=String(NEWDATE.getMonth()+1);
			var TODATE=String(NEWDATE.getDate());
			if (NEWDATE.getMonth() < 10)
			{
				TOMONTH="0"+TOMONTH;
			}
			if (NEWDATE.getDate() < 10)
			{
				TODATE="0"+TODATE;
			}
			var TODAY=TOYEAR+TOMONTH+TODATE;
			this.fpath_generic = "Generic_"+results["MFRR"]+"_"+TODAY+"_"+this.getNumAttn(results)+".pdf";
			this.tpath=this.getNumAttn(results);
		}
		// ,
		// "rd05": function (dialog) {
		// 	this.ETCC = false;
		// }
		,
		getNumAttn: function (results) {
			//for ( var i=1; i<=5; i++) {
			for ( var i=1; i<=4; i++) {
				if ( results["rd0"+i] ) {
					switch (i) {
						case 1:
						var nAttns = "GPC";
						break;
						case 2:
						var nAttns = "Quotes";
						break;
						case 3:
						var nAttns = "Certificate";
						break;
						case 4:
						var nAttns = results["ETCC"];
						// break;
						// case 5:
						// var nAttns = results["ETCC"];
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
									name: "For a Single Item"
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
							align_children: "align_row",
							elements:
							[
								{
									type: "static_text",
									name: "Generic Format for Multiple Items"
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
									name: "MFR: "
								},
								{
									item_id: "MFRR",
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
									name: "Certificate"
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
									name: "Certified Date: "
								},
								{
									item_id: "CERD",
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
									name: "Certificate",
								},
								// },
								{
								 	type: "radio",
									item_id: "rd04",
									group_id: "rado",
									name: "Other",
								},
								// {
								// 	type: "radio",
								// 	item_id: "rd04",
								// 	group_id: "rado",
								// 	name: "Invoice",
								// },
								// {
								// 	type: "radio",
								// 	item_id: "rd05",
								// 	group_id: "rado",
								// 	name: "Other",
								// },
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
	console.println(dialog1.tpath);
	// var NEWDATE=new Date();
	// var TOMONTH=String(NEWDATE.getMonth());
	// var TODATE=String(NEWDATE.getDate());
	// if (NEWDATE.getMonth() < 10)
	// {
	// 	TOMONTH="0"+TOMONTH;
	// }
	// if (NEWDATE.getDate() < 10)
	// {
	// 	TODATE="0"+TODATE;
	// }
	// var TODAY=String(FY)+TOMONTH+TODATE;
	if (ATTNTYPE != "GPC" && ATTNTYPE != "Certificate" && ATTNTYPE != "Quotes")
	{
		//if(ATTNTYPE == "Quotes"){
		//ATTNTYPE="Quotes"
		//} else {
		ATTNTYPE="Others"
		//}
	}
	//console.println(dialog1.fpath);
	var savepath="/N/DMLSS/TMDE/"+ATTNTYPE+"/"+FY+"/"+dialog1.fpath
	var savepath_generic="/N/DMLSS/TMDE/"+ATTNTYPE+"/"+FY+"/"+dialog1.fpath_generic
	var savepathcert="/N/DMLSS/TMDE/"+ATTNTYPE+"/"+FY+"/"+dialog1.cerdpath
	if( "ok" == retn)
	{
	while ("ok" == retn)
		{
			// app.alert(savepathcert);
			// app.alert(dialog1.MFR_VAL.length);
			// app.alert(dialog1.WON_VAL != "");
			// app.alert(dialog1.ECN_VAL != "");
			if ((dialog1.MFR_VAL.length == 0) & (dialog1.WON_VAL.length == 0 | dialog1.ECN_VAL.length == 0) & (dialog1.CERD.length == 0))
			{
				app.alert("Please enter either Work Order Number and ECN (for Single Device) or Manufacturer for (Multiple Devices) or Certified Date")
				retn = app.execDialog(dialog1);
			}

			else
			{
			if (dialog1.MFR_VAL.length != 0 | dialog1.MFR_VAL != null)
			{
				if (((dialog1.MFR_VAL != "0" | dialog1.MFR_VAL.length != 0) & ((dialog1.WON_VAL == null | dialog1.WON_VAL.length == 0) | (dialog1.ECN_VAL.length == 0 | dialog1.ECN_VAL == null))) & (dialog1.CERD.length == 0))
				{
						try
						{
							this.saveAs({cPath: savepath_generic, bPromptToOverwrite: true});
						}
						catch(e)
						{
							savepath_generic=savepath_generic.replace(".pdf","2.pdf")
							for (i=2; i<100; i++)
							{
								try
								{
									this.saveAs({cPath: savepath_generic, bPromptToOverwrite: true});
									break;
								}
								catch(e)
								{
									savepath_generic=savepath_generic.replace(String(i)+".pdf",String(i+1)+".pdf")
								}
							}
						}
					savepath=savepath_generic;
					}
					else if (dialog1.CERD.length == 8) {
						// savepath="/N/DMLSS/TMDE/"+ATTNTYPE+"/"+FY+"/"+dialog1.cerdpath

						if (dialog1.ECN_VAL.length < 6)
						{
							var ECNfiller="0";
							var ECNstandard="";
							for (i=0; i <= 6-dialog1.ECN_VAL.length; i++)
							{
								ECNstandard=String(ECNfiller.repeat(i))+String(dialog1.ECN_VAL);
							}
							var savepathtemp=savepathcert.substring(savepathcert.indexOf("ECN"),savepathcert.indexOf("_"))
							// app.alert(savepathtemp);
							// app.alert(savepathcert);
							// app.alert(ECNstandard);
							savepathcert=savepathcert.replace(savepathtemp,"ECN"+ECNstandard);
							
							this.saveAs({cPath: savepathcert, bPromptToOverwrite: true});
						} else {
						this.saveAs({cPath: savepathcert, bPromptToOverwrite: true});
							// app.alert("B");
						}
					savepath=savepathcert;
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
						// app.alert(savepath);
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
			// app.alert(savepath);
				//var temp_path=this.path;
				var temp_path=savepath;
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
					else if (dialog1.CERD.length != 8) {
						app.alert("The Certified Date you entered: "+ dialog1.CERD+"\n"+"Entered: "+dialog1.CERD.length+"-digits"+"\n"+"Allowed: 12-digits")
						retn = app.execDialog(dialog1);
					}
					else if ( dialog1.ECN_VAL.length > 6)
					{
						app.alert("The ECN you entered: "+ dialog1.ECN_VAL+"\n"+"Entered: "+dialog1.ECN_VAL.length+"-digits"+"\n"+"Allowed: less than 6-digits")
						retn = app.execDialog(dialog1);
					}
					// else if ((dialog1.WON_VAL != null | dialog1.ECN_VAL != null) & dialog1.MFR != null)
					// {
					// 	app.alert("Please enter either (Work Order Number and ECN for Single Device) or (Manufacturer for Multiple Devices) ")
					// 	retn = app.execDialog(dialog1);
					// }
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
}
