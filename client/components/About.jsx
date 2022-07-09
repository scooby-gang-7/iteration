import React from 'react';
import '../stylesheets/styles.css'

function About()  {

    return (
        <div>
            <h1>Scratch Project</h1>
            <div>
                <h3>Problem/Solution</h3>
                <p>Traveling with friends can be tough. Everyone has their own spots they want to hit, all during the same trip, and no one knows which ones you'll have time for. We wanted to create an app that would allow users to to create a library of places the group wants to visit during the trip. Users are able to interact with Google Map's API, using search functionality for specific places based on location and pin parameters that populate the database. This info is displayed from the database with upvote and downvote functionality, based on the specific trip and user database relationship. 

                The tech stack we utilized was React, Express, Node, and Postgres. We wanted to  
                    
                We envisioned this application revolving around social capability - mutliple users being able to interact within one trip component, with real-time visuals for which places are most popular and agreed upon, making on-the-spot decisions much more possible. More doing, less deliberating, all while being able to visualize where the places are in relation to another.  
                </p>
            </div>
            <div>
                <h3>Challenges</h3>
                <p>Our biggest challenge was time. Although we were able to meet our MVP using the tech stack we wanted</p>
            </div>
            <div>
                <h3>Stretch Goals</h3>
                <p>We wanted to implement a road-trip pricing companion to associate cost</p>
            </div>
        </div>
    );
}

export default About;