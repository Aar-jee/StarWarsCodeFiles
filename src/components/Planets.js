import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Typeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';
import axios from 'axios';


class Planets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planets: [],
            selected: {}
        };
    }

    logout = () => {
        this.props.history.push({
            pathname: '/'
        });
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://swapi.co/api/planets/',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            this.setState({
                planets: response.data.results
            });
        })
            .catch(function (error) {
                console.log("Post Error : " + error);
            });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="topLeftCorner"><img src="https://s3.amazonaws.com/creativetim_bucket/new_logo.png" /> {this.props.location.state.data.name}
                    </div>
                    <Button className="logout-btn"
                        block
                        bssize="large"
                        onClick={this.logout}
                    >
                        <span className="glyphicon glyphicon-log-out"></span> &nbsp;
                        Logout
                </Button>
                </div>
                <div className="row">
                    <div className="searchBox">
                        <div className="col-sm-12 col-md-12">
                            <Fragment>
                                <Typeahead
                                    labelKey="name"
                                    options={this.state.planets}
                                    renderMenu={(results, menuProps) => {
                                        return (
                                            <Menu {...menuProps}>
                                                {results.map((result, index) => (
                                                    <MenuItem option={result} position={index}>
                                                        {result.name}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        );
                                    }}
                                    highlightOnlyResult={true}
                                    placeholder="Search Planet..."
                                    onChange={(selected) => {
                                        this.setState({
                                            selected: selected[0]
                                        });
                                    }}
                                />
                            </Fragment>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        {this.state.selected ?
                            <div>
                                <p>Planet Name: {this.state.selected.name}</p>
                                <table className="table table-bordered table-hover">
                                    <tbody className="planets">
                                        <tr className="table-secondary">
                                            <td>Diameter:</td>
                                            <td>{this.state.selected.diameter}</td>
                                        </tr>
                                        <tr className="table-success">
                                            <td>Population:</td>
                                            <td>{this.state.selected.population}</td>
                                        </tr>
                                        <tr className="table-danger">
                                            <td>Climate:</td>
                                            <td>{this.state.selected.climate}</td>
                                        </tr>
                                        <tr className="table-warning">
                                            <td>Rotation Period:</td>
                                            <td>{this.state.selected.rotation_period}</td>
                                        </tr>
                                        <tr className="table-secondary">
                                            <td>Orbital Period:</td>
                                            <td>{this.state.selected.orbital_period}</td>
                                        </tr>
                                        <tr className="table-success">
                                            <td>Terrain:</td>
                                            <td>{this.state.selected.terrain}</td>
                                        </tr>
                                        <tr className="table-danger">
                                            <td>Surface Water:</td>
                                            <td>{this.state.selected.surface_water}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            : null

                        }

                    </div>
                </div>
            </div>

        );
    }
}
export default withRouter(Planets);