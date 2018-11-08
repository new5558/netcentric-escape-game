import React from 'react'
import Axios from '../axiosConfig'
import {SOCKET_URL} from '../../env'

class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost(user) {
        Axios({
            method: 'delete',
            url: '/user',
            data: user
        }).then((response) => {})
        .catch((err) => console.log(err));
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        this.connectSocket();
    }

    connectSocket(){
        let socket = new WebSocket(`${SOCKET_URL}/player`);

        socket.addEventListener("message", (event) => {
            let tableData = [];
            try{
                tableData = JSON.parse(event.data);
                this.setState({ tableData  });
                console.log(tableData)
            }catch(error){

            }
        });
        socket.addEventListener("error",(error) => {
            alert(error);
        });
        socket.addEventListener("close",(event) => {
            if(event.code === 1006){
                console.log("reconnect")
                this.connectSocket();
            }
        });
    }


    render() {
        return (
            <div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Win</th>
                            <th scope="col">Lose</th>
                            <th scope="col">Edit</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableData.map(function (row, index) {
                                return <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{row.nickname}</td>
                                    <td>{row.email}</td>
                                    <td>{row.win}</td>
                                    <td>{row.lose}</td>
                                    <td><button name="delete" onClick={this.deletePost.bind(this, row)} className="btn btn-outline-danger btn-sm remove">Delete</button></td>
                                </tr>
                            }.bind(this))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CurrentUser;


