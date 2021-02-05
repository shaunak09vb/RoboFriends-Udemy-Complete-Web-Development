import React from "react"
import CardList from "../components/CardList.js"
import SearchBox from "../components/SearchBox.js"
import Scroll from "../components/Scroll.js"
import ErrorBoundry from "../components/ErrorBoundry.js"
import "./App.css"

class App extends React.Component{
    constructor(){
        super()
        this.state={
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        //console.log("Check");
        fetch('https://jsonplaceholder.typicode.com/users').then(Response=> {
            return Response.json();
        }).then(users => {
            this.setState({robots: users})
        });        
    }
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})        
    }
    render(){
        const {robots,searchfield}=this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        //console.log(filteredRobots);
        if (!robots.length){
            return <h1>Loading...</h1>
        }
        else {
            return(
                <div className="tc">
                    <h1 className = "f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                        
                    </Scroll>

                </div>
            );
        }
    }
} 

export default App;