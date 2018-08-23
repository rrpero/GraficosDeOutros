/*global define*/
define( [
    'jquery',
    'underscore',
    'qlik',
    'ng!$http',
    'ng!$q'

], function ($, _, qlik, $http, $q) {

    var app = qlik.currApp();

    // ****************************************************************************************
    // Helper Promises
    // ****************************************************************************************
    var getBookmarkList = function () {
        var defer = $q.defer();

        app.getList( 'BookmarkList', function ( items ) {
            defer.resolve( items.qBookmarkList.qItems.map( function ( item ) {
                return {
                    value: item.qInfo.qId,
                    label: item.qData.title
                }
            } )
                         );
        } );
        return defer.promise;
    };

    var getSheetList = function () {

        var defer = $q.defer();

        app.getAppObjectList( function ( data ) {
            var sheets = [];
            var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
                return item.qData.rank;
            } );
            _.each( sortedData, function ( item ) {
                sheets.push( {
                    value: item.qInfo.qId,
                    label: item.qMeta.title
                } );
            } );
            return defer.resolve( sheets );
        } );

        return defer.promise;
    };

    // ****************************************************************************************
    // Layout
    // ****************************************************************************************


    var iframeGrafico = {
        ref: "props.iframeGrafico",
        component: "dropdown",
        type: "string",
        label: "Gráfico",
        options: [
            {
				value: "Escolha um",
				label: "Escolha um"
			},
            {
				value: "<iframe src='' style='border:none;width:100%;height:100%;'></iframe>",
				label: "Gráfico 1"
			},
			{
				value:"<iframe src='' style='border:none;width:100%;height:100%;'></iframe>",
				label:"Gráfico 2"
			},
			{
				value:"<iframe src='' style='border:none;width:100%;height:100%;'></iframe>",
				label:"Chamados"
			}
        ],
        defaultValue: "Escolha um"
    };

    
	

    // ****************************************************************************************
    // Setup
    // ****************************************************************************************
    var settings = {
        uses: "settings",
        items: {
            general: {
                items: {
                    showTitles: {
                        defaultValue: false
                    }
                }
            },
            bookmarkSettings: {
                type: "items",
                label: "Settings",
                items: {
                    iframeGrafico: iframeGrafico
                  
                }
            }
        }
    };

    var panelDefinition = {
        type: "items",
        component: "accordion",
        items: {
            settings: settings
        }
    };

    // ****************************************************************************************
    // Return Values
    // ****************************************************************************************
    return panelDefinition;
});