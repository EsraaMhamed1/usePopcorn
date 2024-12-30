import React from 'react';
import TextExpender from './TextExpander';

function Main() {
	return (
		<div>
			<TextExpender>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quam
				eligendi vero dignissimos temporibus, dolorem eaque veritatis delectus
				optio eveniet quibusdam doloremque minus dolor perferendis quos
				explicabo, cupiditate nesciunt magnam!
			</TextExpender>

			<TextExpender
				collapsedNumWords={20}
				expandButtonText='show text'
				collapseButtonText='collapse text'
				buttonColor={'#ff6622'}
			>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ut
				sed, illum voluptatum natus quod quis dicta rem porro? Ex?
			</TextExpender>

			<TextExpender buttonInline={false} className={'box'} buttonColor={'blue'}>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius libero,
				voluptas incidunt explicabo inventore dolore assumenda facere harum sint
				qui ipsam quos rerum dolor obcaecati.
			</TextExpender>
		</div>
	);
}

export default Main;
