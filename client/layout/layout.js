Template.layout.onCreated(() => {


})

Template.layout.onRendered(() => {
    $('html').attr('class', 'layout-pf layout-pf-fixed transitions')
    $('body').attr('class', 'cards-pf')
    

    // Initialize the vertical navigation
    $().setupVerticalNavigation(true);
})

Template.layout.helpers({

})

Template.layout.events({

})