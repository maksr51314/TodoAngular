'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

//add config for route provider
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

//  TODO: add this template for server
    var modelTemplate = {
        group1 : [
            {
                name : 'someName',
                surname: 'someSurname',
                tel : 1
            },
            {
                name : 'someName2',
                surname: 'someSurname2',
                tel : 2
            }
        ],
        group2 : [
            {
                name : 'someName3',
                surname: 'someSurname3',
                tel : 3
            },
            {
                name : 'someName4',
                surname: 'someSurname4',
                tel : 4
            }
        ]
    };

    var contactTemplate = {
        name : '',
        surname: '',
        tel : ''
    };

    /**
     * @constructor
     */
    function SimpleCtrl() {
        /************** definitions **************/

        this.contact = {};
        //data from server
        $scope.model = modelTemplate;

        //default chosen Group & Contact
        $scope.chosenGroup = modelTemplate[ this.getGroups()[0] ];
        $scope.chosenContact = $scope.chosenGroup[ 0 ];

        //all groups
        $scope.groups = this.getGroups();
        $scope.changedGroup = $scope.groups[ 0 ];

        //flags for control active edit states
        $scope.isNewModeActive = false;
        $scope.isNewGroupModeActive = false;
        $scope.isEditModeActive = false;

        //default names for group and contact
        $scope.newGroup = $scope.groups[ 0 ];
        $scope.newContact = {};

        /*************** functions ***************/
        $scope.changeChosenGroupFn = this.changeChosenGroup.bind( this );
        $scope.changeGtoupFn      = this.changeGroup.bind( this );
        $scope.addNewContactFn    = this.addNewContact.bind( this );
        $scope.saveNewContactFn   = this.saveNewContact.bind( this );
        $scope.addNewGroupFn      = this.addNewGroup.bind( this );
        $scope.saveNewGroupFn     = this.saveNewGroup.bind( this );
        $scope.cancelSaveFn       = this.cancelSave.bind( this );
        $scope.deleteContactFn    = this.deleteContact.bind( this );
        $scope.selectNewTabFn     = this.selectNewTab.bind( this );
    }

    /**
     * get array of all groups
     * @returns {Array}
     */
    SimpleCtrl.prototype.getGroups = function() {
        return Object.keys( $scope.model );
    };

    /**
     * change group for contact
     * @param newGroup
     */
    SimpleCtrl.prototype.changeGroup = function( newGroup ) {

        if ( $scope.model[newGroup] === $scope.chosenGroup ) {
            alert('You want to chose the same group');
            return;
        }

        if ( !$scope.model[newGroup] ) $scope.model[newGroup] = [];

        $scope.model[newGroup].push( $scope.chosenContact );

        //delete unused chosenGroup
        $scope.chosenGroup.splice( $scope.chosenGroup.indexOf( $scope.chosenContact ), 1 );

        //reset data
        $scope.chosenGroup = $scope.model[ newGroup ];
        $scope.chosenContact = $scope.chosenGroup.last();
        $scope.newGroup = '';
    };

    /**
     * on 'add new contact' mode
     */
    SimpleCtrl.prototype.addNewContact = function() {
        $scope.isNewModeActive = true;

        //add simple form to groups
        this.contact = angular.copy( contactTemplate );
//        $scope.chosenGroup.push( this.contact );
        $scope.chosenContact = this.contact;

        //enable lines edit
        $scope.isEditModeActive = true;
    };

    /**
     * save new contact
     */
    SimpleCtrl.prototype.saveNewContact = function() {
        if ( !$scope.model[ $scope.newGroup ] ) $scope.model[ $scope.newGroup ] = [];

        $scope.model[ $scope.newGroup ].push( this.contact );

        //disable lines edit
        $scope.isEditModeActive = false;
    };

    /**
     *  on 'add new group' mode
     */
    SimpleCtrl.prototype.addNewGroup = function() {
        $scope.isNewGroupModeActive = true;
    };

    /**
     * save new group
     */
    SimpleCtrl.prototype.saveNewGroup = function() {
        if ( $scope.groups.indexOf( $scope.newGroup ) !== -1 ) {
            console.log( 'User wants to create new not unique group: ' + $scope.newGroup );
            return;
        }

        //added new group to model
        $scope.groups.push( $scope.newGroup );
        $scope.model[ $scope.newGroup ] = [];

        //change modes
        $scope.isNewGroupModeActive = false;

        //reset template for new group
        $scope.newGroup = '';
    };

    /**
     * update default chosen group
     */
    SimpleCtrl.prototype.changeChosenGroup = function() {
        if ( $scope.chosenGroup ) $scope.chosenContact = $scope.chosenGroup[ 0 ];
    };

    /**
     * cancel save mode
     */
    SimpleCtrl.prototype.cancelSave = function() {
        if ( $scope.isNewModeActive ) {
            $scope.isNewModeActive = !$scope.isNewModeActive;

            $scope.changedGroup.splice( $scope.changedGroup.lastIndex(), 1 );
        }

        if ( $scope.isNewGroupModeActive ) {
            $scope.isNewGroupModeActive = !$scope.isNewGroupModeActive;
        }

    };

    /**
    * delete contact
    */
    SimpleCtrl.prototype.deleteContact = function() {
        $scope.chosenGroup.splice( $scope.chosenGroup.indexOf( $scope.chosenContact ), 1 );
        $scope.chosenContact = {};
    };

    /**
     * select new TAB
     * @param item
     */
    SimpleCtrl.prototype.selectNewTab = function(item) {
        $scope.chosenContact = item;
    };

    Array.prototype.last = function() {
        return this[ this.lastIndex() ];
    };

    Array.prototype.lastIndex = function() {
        return this.length - 1;
    };

    return new SimpleCtrl();
}]);