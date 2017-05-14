//================================
// MODAL
//================================
//this controls the modal window that appears

var modal = 
{
	//buttons
	rightButton: null,
	leftButton: null,

	//elements
	modalBg: null,
	modal: null,
	modalLabel: null,
	modalText: null,
	modalImg: null,

	//methods
	init: function( tRightButton, tLeftButton, tModalBg, tModal, tModalLabel, tModalText, tModalImg )
	{
		this.rightButton = tRightButton;
		this.leftButton = tLeftButton;
		this.modalBg = tModalBg;
		this.modal = tModal;
		this.modalLabel = tModalLabel;
		this.modalText = tModalText;
		this.modalImg = tModalImg;

		//pack the events for rightButton in an array so it can be applied all at once
		var rightButtonEvents = [ this.closeModal.bind( this, 500 ), hangMan.init.bind( hangMan ) ];

		this.openModal( "Ready to Play?", "Press a button to guess a letter!", null, rightButtonEvents, null, 0 );
	},

	openModal: function( tLabelMessage, tMessage, tImage, tRightBtnActionsArr, tLeftBtnActionsArr, tTransitionTime )
	{
		this.modalBg.style.transition = `all ${tTransitionTime/1000}s`;
		this.modalBg.style.opacity = 1;

		//set modal label/text/img
		this.modalLabel.textContent = tLabelMessage;
		this.modalText.textContent = tMessage;

		//display image if it exists
		if( tImage != null )
		{
			this.modalImg.src = tImage;
			this.modalImg.style.display = "inline-block"; 
		}
		else
		{
			this.modalImg.style.display = "none";
		}

		//attach the events to the right button if there are events
		//otherwise, don't display the button at all
		if( tRightBtnActionsArr != null )
		{
			this.attatchEvents( this.rightButton, "click", tRightBtnActionsArr );
			this.rightButton.style.display = "inline-block";
		}
		else
		{
			this.rightButton.style.display = "none";
		}

		//attatch the events to the left button if there are events
		//otherwise, dont display the button at all
		if( tLeftBtnActionsArr != null )
		{
			this.attatchEvents( this.leftButton, "click", tLeftBtnActionsArr );
			this.leftButton.style.display = "inline-block";
		}
		else
		{
			this.leftButton.style.display = "none";
		}

		//turn the actual modal on
		setTimeout( this.showModal.bind( this ), tTransitionTime );
	},

	//hook up an array of events to a target DOM element
	attatchEvents: function( tTarget, tEventType, tEventsArr )
	{
		if( tEventsArr != null )
		{
			if( tEventsArr.length > 0 )
			{
				for( var i = tEventsArr.length; i >= 0; --i )
				{
					tTarget.addEventListener( tEventType, tEventsArr[i] );	
				}
			}
		}
	},

	detatchEvents: function( tTarget, tEventType, tEventListener )
	{
		if( tTarget != null )
		{
			tTarget.removeEventListener( tEventType, tEventListener );
		}
	},

	showModal: function()
	{
		this.modal.style.display = "block";
	},

	closeModal: function( tTransitionTime )
	{	
		//remove the event listeners (so new ones can be assigned)
		this.detatchEvents( this.leftButton, "click", this.closeModal );
		this.detatchEvents( this.rightButton, "click", this.closeModal );
		this.detatchEvents( this.rightButton, "click", hangMan.init );
		this.detatchEvents( this.rightButton, "click", hangMan.updatePokeBankView );

		//this sets the css transition duration ( /1000 so convert from ms to secs )
		this.modalBg.style.transition = `all ${tTransitionTime / 1000}s`;

		this.modal.style.display = "none";
		this.modalBg.style.opacity = 0;
	}
}

//================================
// START
//================================
//initialize the modal
window.addEventListener( "load", function()
{
	modal.init
	(
		document.querySelector( "#modal-yes" ),
		document.querySelector( "#modal-no" ),
		document.querySelector( "#modal-bg-id" ),
		document.querySelector( "#modal-id" ),
		document.querySelector( "#modal-label" ),
		document.querySelector( "#modal-text" ),
		document.querySelector( "#modal-img" )
	);
});