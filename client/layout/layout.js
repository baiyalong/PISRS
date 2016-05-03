Template.layout.onCreated(function(){


})

Template.layout.onRendered(function(){
    $('html').attr('class', 'layout-pf layout-pf-fixed transitions')
    $('body').attr('class', 'cards-pf')
    

    // Initialize the vertical navigation
    $().setupVerticalNavigation(true);
})

Template.layout.helpers({

})

Template.layout.events({

})