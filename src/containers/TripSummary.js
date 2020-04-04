import React from 'react'

const TripSummary = ({trips}) => {
    return (
        <div>
            <div>
                <h1>Trip List</h1>
            </div>
            <div>
                <table class="table table-striped ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>From Location</th>
                            <th>To Location</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip) => (
                            <tr>
                                <th scope="row">{trip.riderId}</th>
                                <td>{trip.fromLocation}</td>
                                <td>{trip.toLocation}</td>
                                <td>{trip.startTime}</td>
                                <td>{trip.endTime}</td>
                                <td>{trip.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
};

export default TripSummary