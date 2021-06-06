import React, {ReactNode} from 'react';
import {Style} from './styles';
import CustomizedSearch from '../../../commons/search/index';
import MainBackground from '../../home-page/components/main-background/index';
import VenueCard from '../components/venue-card/index';
import {VenueModel} from '../../../models/venue-model';
import {getAllVenues, getSearchedVenues} from '../../../services/venue-service';
import Loader from '../../../commons/loader/index';

export type Props = Style;

interface State {
	isLoading: boolean;
	venues: VenueModel[];
}

export class AllVenuesPage extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			venues: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		getAllVenues().then(venues => this.setState({venues: venues, isLoading: false}));
	}

	public render(): ReactNode {
		const {classes} = this.props;
		const {venues, isLoading} = this.state;

		return (
			<div>
				{isLoading ? <Loader/> : (
					<>
						<MainBackground
							backgroundImage="https://image.kurier.at/images/cfs_landscape_616w_347h/2706293/46-110947826.jpg"
							title="ОРГАНИЗУЙ КОНЦЕРТ СВОЕЙ МЕЧТЫ"
							subtitle=""
							middleText="Бронируй площадку, продавай билеты, стань кузнецом своей зажигательной пятницы."
							backGroundStyle={classes.background}
							componentToShow={
								<CustomizedSearch
									getSearchedContent={this.getSearchedVenues}
									title={'Найти площадку'}
								/>
							}
						/>

						<div className={classes.cards}>
							{venues.map((venue, index) => {
								return (
									<div className={classes.cardItem} key={index}>
										<VenueCard venue={venue}/>
									</div>
								);
							})}
						</div>
					</>
				)}
			</div>
		);
	}

	private getSearchedVenues = (search: string) => {
		this.setState({isLoading: true});
		getSearchedVenues(search).then(venues => this.setState({venues: venues, isLoading: false}));
	};
}


