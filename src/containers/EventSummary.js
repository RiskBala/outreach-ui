
import React, { Component } from "react";
import "./Home.css";




 export default class EventSummary extends Component { 
     render() {
         const events=this.props.events;
         console.log('props>>>',this.props.isAdmin);
    return (
        <div>
            <div class="container">
                <h3>Event Summary</h3> 
                <div class="row">
                 {events.map((event) => (                    
                    <div class="col-sm-4">
                        <div class="panel panel-default">
                            <div class="card-body text-center">
                                 <h5 class="card-title">{event.id}</h5>
                                <h5 class="card-title">{event.eventName}</h5>
                                <p class="card-text text-left"> {event.description}</p>
                                 <p class="card-text text-left">{event.pointOfContact}</p>
                                  <p class="card-text text-left">{event.fromDateTime} to {event.toDateTime}</p>
                                  <p class="card-text text-left">{event.status}</p>
                                    {!this.props.isAdmin && <a href="#"  onClick={()=>{this.props.handleClick(event.id)}} class="btn btn-info">Register</a>}
                                 <p class="card-text text-left"></p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>

        </div>

    )
     }
};

