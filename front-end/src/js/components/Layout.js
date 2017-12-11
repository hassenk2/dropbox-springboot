import React from "react";
import * as API from '../api/API';
import { Link } from "react-router";
export default class Layout extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password:'',
            error_visibility: 'none'
        }
    }

    handleSignin(userdata){
        API.doLogin(userdata).then((data) =>{
            if(data.length > 0){
                this.setState({"isLoggedIn": true, "error_visibility": "none", "firstname": data[0].firstname, "lastname": data[0].lastname});
                this.props.history.push({pathname: '/homepage', state: this.state});
            }
            else{
                this.setState({"error": "Email or Password doesn't match", "error_visibility": ''});
            }
        }); 
    }
    
    render() {

        const dropbox_img_style = {
            height: '46px',
            width: '46px',
            position: 'absolute',
            right: '0px',
           
            marginTop: '10px'
        }
        
        const dropbox_written_style = {
            height: '34px',
            width: '120px',
            marginTop : '10px',
            position : 'relative',
            top: '2px'
        }

        const dropbox_left_image = {
            height: '288px',
            width: '305px',
            position: 'absolute',
            right: '0px',
            top: '50px',
            marginRight: '10px'
        }

        return (

            <div class="container-fluid" >
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" style={dropbox_img_style} /> 
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg" style = {dropbox_written_style} />
                    </div>
                </div>

                <hr />

                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <img src="https://cfl.dropboxstatic.com/static/images/empty_states/sign-in@2x-vflBuaBON.png" style={dropbox_left_image} />
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style = {{position :'relative', top: '80px', marginLeft: '10px'}}>
                        <h4 style = {{display : 'inline'}} > Sign in </h4>
                        <p style = {{float: 'right', display : 'inline'}}> or <Link to="/signup">create an account </Link> </p>

                        <hr />

                        <form>
                            <div className="form-group">
                                <input type="email" className="form-control" label="Email" placeholder="Email" value={this.state.email} style={{borderRadius : '5px'}} onChange={(e) => {e.preventDefault(); this.setState({email: e.target.value});}}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" label="Password" placeholder="Password" value={this.state.password} style={{borderRadius : '5px'}} onChange={(e) => {e.preventDefault(); this.setState({password: e.target.value}); }} />
                            </div>
                            <div className="form-group">
                                <label className="form-group" ><input type="checkbox" /> Remember me</label>
                                <button type="button" className="btn btn-primary col-auto" style={{ borderRadius : '5px', float: 'right'}} 
                                 onClick={() => this.handleSignin({email: this.state.email, password: this.state.password})}>Signin</button>                        
                            </div>
                            <div className="alert alert-danger fade in" style={{display : this.state.error_visibility}}> {this.state.error}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
