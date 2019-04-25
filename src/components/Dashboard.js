// Inside of Dashboard.js

import React from 'react'

const Dashboard = props => (
    <div>
        <h5>Here are your Todos</h5>
        <div>
            {
                /* We'll print our todos here */
            }
            <form>
                <input name="text"
                value={props.text} 
                onChange={props.handleChange}
                />
                <button>Add Todo</button>
            </form>
        </div>
    </div>
)

export default Dashboard