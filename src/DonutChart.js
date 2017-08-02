import React, { Component } from 'react';
import {Doughnut, defaults} from 'react-chartjs-2';
import merge from 'lodash.merge';

merge(defaults, {
	global: {
		legend: {
	  		display: false
		},
	},
	doughnut: {
		cutoutPercentage: 60
	},
});

class DonutChart extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	sum: (this.props.germanicCount + this.props.latinCount + this.props.frenchCount + this.props.greekCount + this.props.otherCount + this.props.unknownCount),
	    	germanicPercent: '',
	    	latinPercent: '',
	    	frenchPercent: '',
	    	greekPercent: '',
	    	otherPercent: '',
	    	unknownPercent: '',
	    };
	    this.getPercent = this.getPercent.bind(this);
	}

	getPercent(num) {
		return (
			Math.round((num/this.state.sum * 100) * 100) / 100
		);
	}


	componentDidMount() {
		/*console.log(this.refs.chart.chart_instance);
		console.log(JSON.stringify(defaults, null, 2));*/
		this.setState({
			germanicPercent: this.getPercent(this.props.germanicCount),
	    	latinPercent: this.getPercent(this.props.latinCount),
	    	frenchPercent: this.getPercent(this.props.frenchCount),
	    	greekPercent: this.getPercent(this.props.greekCount),
	    	otherPercent: this.getPercent(this.props.otherCount),
	    	unknownPercent: this.getPercent(this.props.unknownCount)
		})
	}

	render() {
	    return (
		<div
	      	style={{
	      		marginTop: '6%'
	      	}}>
	      	<Doughnut
			    ref='chart'
			    height={150}
			    data={{
			        labels: [
			            'Germanic',
			            'Latin',
			            'French',
			            'Greek',
			            'Other/Unknown'
			        ],
			        datasets: [{
			            data: [
			            this.props.germanicCount, 
			            this.props.latinCount, 
			            this.props.frenchCount, 
			            this.props.greekCount, 
			            this.props.otherCount,
			            this.props.unknownCount
			            ],
			            backgroundColor: [
			            this.props.germanicColor,
			            this.props.latinColor,
			            this.props.frenchColor,
			            this.props.greekColor,
			            this.props.otherColor,
			            this.props.unknownColor
			            ],
			            hoverBackgroundColor: [
			            this.props.germanicColor,
			            this.props.latinColor,
			            this.props.frenchColor,
			            this.props.greekColor,
			            this.props.otherColor,
			            this.props.unknownColor
			            ]
			        }]
			    }} 
			/>
			<div
			style={{
				marginTop: '5%'
			}}>
				<div
				style={{
					display: 'inline-block',
					width: '16.66%'
				}}>
					<div
					style={{
						backgroundColor: this.props.germanicColor,
						height: '15px',
						width: '80%',
						marginLeft: '10%',
						marginRight: '10%',
						marginTop: '0',
						marginBottom: '5px',
						boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)'

					}}>
					</div>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: (this.props.windowWidth <= 500) ? '75%' : '85%',
						color: '#666'
					}}
					>Germanic</p>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'lighter',
						fontSize: '85%',
						color: '#666'
					}}
					>{ this.state.germanicPercent }%</p>
				</div>
				<div
				style={{
					display: 'inline-block',
					width: '16.66%'
				}}>
					<div
					style={{
						backgroundColor: this.props.latinColor,
						height: '15px',
						width: '80%',
						marginLeft: '10%',
						marginRight: '10%',
						marginTop: '0',
						marginBottom: '5px',
						boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)'
					}}>
					</div>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: (this.props.windowWidth <= 500) ? '75%' : '85%',
						color: '#666'
					}}
					>Latin</p>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'lighter',
						fontSize: '85%',
						color: '#666'
					}}
					>{ this.state.latinPercent }%</p>
				</div>
				<div
				style={{
					display: 'inline-block',
					width: '16.66%'
				}}>
					<div
					style={{
						backgroundColor: this.props.frenchColor,
						height: '15px',
						width: '80%',
						marginLeft: '10%',
						marginRight: '10%',
						marginTop: '0',
						marginBottom: '5px',
						boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)'
					}}>
					</div>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: (this.props.windowWidth <= 500) ? '75%' : '85%',
						color: '#666'
					}}
					>French</p>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'lighter',
						fontSize: '85%',
						color: '#666'
					}}
					>{ this.state.frenchPercent }%</p>
				</div>
				<div
				style={{
					display: 'inline-block',
					width: '16.66%'
				}}>
					<div
					style={{
						backgroundColor: this.props.greekColor,
						height: '15px',
						width: '80%',
						marginLeft: '10%',
						marginRight: '10%',
						marginTop: '0',
						marginBottom: '5px',
						boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)'
					}}>
					</div>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: (this.props.windowWidth <= 500) ? '75%' : '85%',
						color: '#666'
					}}
					>Greek</p>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'lighter',
						fontSize: '85%',
						color: '#666'
					}}
					>{ this.state.greekPercent }%</p>
				</div>
				<div
				style={{
					display: 'inline-block',
					width: '16.66%'
				}}>
					<div
					style={{
						backgroundColor: this.props.otherColor,
						height: '15px',
						width: '80%',
						marginLeft: '10%',
						marginRight: '10%',
						marginTop: '0',
						marginBottom: '5px',
						boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)'
					}}>
					</div>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: (this.props.windowWidth <= 500) ? '75%' : '85%',
						color: '#666'
					}}
					>Other</p>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'lighter',
						fontSize: '85%',
						color: '#666'
					}}
					>{ this.state.otherPercent }%</p>
				</div>
				<div
				style={{
					display: 'inline-block',
					width: '16.66%'
				}}>
					<div
					style={{
						backgroundColor: this.props.unknownColor,
						height: '15px',
						width: '80%',
						marginLeft: '10%',
						marginRight: '10%',
						marginTop: '0',
						marginBottom: '5px',
						boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)'
					}}>
					</div>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: (this.props.windowWidth <= 500) ? '75%' : '85%',
						color: '#666'
					}}
					>Unknown</p>
					<p
					style={{
						marginTop: '0',
						marginBottom: '0',
						textAlign: 'center',
						fontWeight: 'lighter',
						fontSize: '85%',
						color: '#666'
					}}
					>{ this.state.unknownPercent }%</p>
				</div>
			</div>
	    </div>
	    );
	}
}
export default DonutChart;









