/***************************************************************
*  Copyright notice
*
*  (c) 2010 Thomas Loeffler <typo3@tomalo.de>
*  All rights reserved
*
*  This script is part of the TYPO3 project. The TYPO3 project is
*  free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 2 of the License, or
*  (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*  A copy is found in the textfile GPL.txt and important notices to the license
*  from the author is found in LICENSE.txt distributed with these scripts.
*
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/

/* Class to handle the password tester */

var PasswordTester = Class.create({
	passwordStatus: 0,
	passwordField: null,
	colorRGB: 'white',
	message: '',	
	
	initialize: function () {
		Ext.onReady( function () {
			this.passwordField = Ext.get('field_password');

			this.passwordField.on('keyup', function () {
				var password = this.passwordField.getValue();
				// set status to zero on each keyup
				this.passwordStatus = 0;
                this.passwordSecure = false;

				// calculates the strength of the password
				this.calculateStrength(password);
				
				// generates the field with the color
				this.generateColorField();

			}, this);
		}, this);
	},
	
	calculateStrength: function (passwordString) {
		if (beSecurePwConf.lowercaseChar == 1 && passwordString.search(/[a-z]/) != -1) {
			this.passwordStatus++;
		}
		if (beSecurePwConf.capitalChar == 1 && passwordString.search(/[A-Z]/) != -1) {
			this.passwordStatus++;
		}
		if (beSecurePwConf.digit == 1 && passwordString.search(/[0-9]/) != -1) {
			this.passwordStatus++;
		}
		if (beSecurePwConf.specialChar == 1 && passwordString.search(/[^0-9a-z]/i) != -1) {
			this.passwordStatus++;
		}
        if (this.passwordStatus >= beSecurePwConf.patterns && passwordString.length >= beSecurePwConf.passwordLength) {
            this.passwordSecure = true;
        }
	},

	generateColorField: function() {
		Ext.destroy(Ext.get('password_strength'));
		this.passwordField.setStyle('float', 'left');
		if (this.passwordSecure == true) {
			Ext.DomHelper.insertAfter(
                this.passwordField,
                {
                    tag: 'img',
                    src: '../../../../typo3conf/ext/be_secure_pw/res/img/accept.png',
                    id: 'password_strength',
                    style: 'margin: 2px 0 0 5px;'
                },
                false
            );
		} else {
            Ext.DomHelper.insertAfter(
                this.passwordField,
                {
                    tag: 'img',
                    src: '../../../../typo3conf/ext/be_secure_pw/res/img/cancel.png',
                    id: 'password_strength',
                    style: 'margin: 2px 0 0 5px;'
                },
                false
            );
		}



		/*Ext.DomHelper.insertAfter(
			//this.passwordField, '<div style="background-color: ' + color + '; width: 50px; height: 1em;"></div>'
			//Ext.DomQuery.selectNode('input[name="last"]'),  
			this.passwordField,
			{  
				tag: 'div',  
				id: 'password_strength',
				html: this.message,
				'style': 'color:' + color + ';border:1px solid gray;float:left;margin:1px 0 0 3px;padding:1px 5px;width:auto;height:15px;background-color:' + this.colorRGB  
			},
			false
		);*/
	}
});

var TYPO3BackendPasswordTester = new PasswordTester();