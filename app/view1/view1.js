'use strict';

angular.module('myApp.view1', ['ngRoute'])

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
                surname: 'someSurname'
            },
            {
                name : 'someName2',
                surname: 'someSurname2'
            }
        ],
        group2 : [
            {
                name : 'someName3',
                surname: 'someSurname3'
            },
            {
                name : 'someName4',
                surname: 'someSurname4'
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
        //data from server
        $scope.model = modelTemplate;

        //default chosen Group & Contact
        $scope.chosenGroup = modelTemplate[ this.getGroups()[0] ];
        $scope.chosenContact = $scope.chosenGroup[ 0 ];

        //all groups
        $scope.groups = this.getGroups();
        $scope.changedGroup = undefined;

        //flags for control active edit states
        $scope.isNewModeActive = false;
        $scope.isNewGroupModeActive = false;

        //default names for group and contact
        $scope.newGroup = '';
        $scope.newContact = {};

        /*************** functions ***************/
        $scope.changeGtoupFn      = this.changeGroup.bind( this );
        $scope.addNewContactFn    = this.addNewContact.bind( this );
        $scope.saveNewContactFn   = this.saveNewContact.bind( this );
        $scope.addNewGroupFn      = this.addNewGroup.bind( this );
        $scope.saveNewGroupFn     = this.saveNewGroup.bind( this );
    }

    /**
     * get array of all groups
     * @returns {Array}
     */
    SimpleCtrl.prototype.getGroups = function() {
        return Object.keys( $scope.model );
    };


    SimpleCtrl.prototype.changeGroup = function( newGroup ) {

        if ( $scope.model[newGroup] === $scope.chosenGroup ) {
            alert('You want to chose the same group');
            return;
        }

        if ( !$scope.model[newGroup] ) $scope.model[newGroup] = [];

        $scope.model[newGroup].push( $scope.chosenContact );

        //TODO: get selected group
    };

    SimpleCtrl.prototype.addNewContact = function() {
        $scope.isNewModeActive = true;
    };

    SimpleCtrl.prototype.saveNewContact = function() {
        var template = angular.copy( contactTemplate );

        template.name = $scope.newContact.name;
        template.surname = $scope.newContact.name;
        template.tel = $scope.newContact.name;

        //reset new contact
        $scope.newContact = {};

        if ( $scope.groups.indexOf( $scope.newGroup ) === -1 ) {
            console.log( 'This group doesn\'t exists: ' + $scope.newGroup );
            return;
        }

        if ( !$scope.model[ $scope.newGroup ] ) $scope.model[ $scope.newGroup ] = [];

        $scope.model[ $scope.newGroup ].push( template );

        $scope.isNewModeActive = false;
    };

    SimpleCtrl.prototype.addNewGroup = function() {
        $scope.isNewGroupModeActive = true;
    };

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

    return new SimpleCtrl();
}]);