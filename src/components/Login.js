import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import "../Login.css";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    handleSubmit = event => {
        event.preventDefault();
        axios({
            method: 'get',
            url: 'https://swapi.co/api/people/?search=' + this.state.name,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data.results[0].name === this.state.name) {
                if (response.data.results[0].birth_year === this.state.password) {
                    let data = { name: this.state.name };
                    this.props.history.push({
                        pathname: '/planets',
                        state: { data: data }
                    });
                }
                else {
                    alert("Incorrect Password")
                }
            }
            else {
                alert("Incorrect Name")
            }
        })
            .catch(function (error) {
                console.log("Post Error : " + error);
                alert("Incorrect Name/Password")
            });
    }

    render() {
        return (
                <div className="container">
                   <h5 class="sign-in">Sign In</h5>
                    <form className="main-form" onSubmit={this.handleSubmit}>
                        <FormGroup controlId="name">
                            <FormControl className="txtInput"
                                autoFocus
                                type="text"
                                placeholder="User Name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormControl className="txtInput"
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                                placeholder="Password"
                            />
                        </FormGroup>
                        <Button className="login-btn"
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                          {/* <div class="col-sm-9 col-md-7 col-lg-5 mx-auto"> 
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
       
        </div> */}
                    </form>
                </div>
              
                


        );
    }
}
export default withRouter(Login);


