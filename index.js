(function() {
    "use strict";

    function Tbody(props) {
        function Rows() {
            return props.users.map(function(u) {
                return (
                    <tr key={u.id}>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>{u.email}</td>
                    </tr>
                );
            });
        }

        return (
            <tbody>
                {Rows()}
            </tbody>
        );
    }

    let Table = createReactClass({
        
        displayName: 'Root',

        getInitialState: function() {
            return {
                users: [],
                fnToggle: 0,
                lnToggle: 0,
                emailToggle: 0
            };
        },

        componentDidMount() {
            fetch("users.json")
            .then(response => response.json())
            .then(json => {
                this.setState({
                    users: json
                });
            });
        },

        sort(key) {
            let stateToogleVar,
                updateUsers = this.state.users.sort(
                    (a,b) => {
                        let aVal = a[key].toLowerCase(),
                            bVal = b[key].toLowerCase();
                        return (aVal > bVal) ? 1 : ((bVal > aVal) ? -1 : 0)
                    }
                );

            switch (key) {
                case 'firstName':
                    stateToogleVar = this.state.fnToggle + 1;
                    this.setState({fnToggle: stateToogleVar});
                    break;
                case 'lastName':
                    stateToogleVar = this.state.lnToggle + 1;
                    this.setState({lnToggle: stateToogleVar});
                    break;
                case 'email':
                    stateToogleVar = this.state.emailToggle + 1;
                    this.setState({emailToggle: stateToogleVar});
                    break;
            }

            updateUsers = stateToogleVar % 2 == 0 ? updateUsers.reverse() : updateUsers;
            this.setState({users: updateUsers});
        },

        render: function() {
            const cursor = {
                cursor: 'pointer'
            };
            return (
                <table>
                    <thead>
                        <tr>
                            <th style={cursor} onClick={this.sort.bind(null, 'firstName')}>First Name</th>
                            <th style={cursor} onClick={this.sort.bind(null, 'lastName')}>Last Name</th>
                            <th style={cursor} onClick={this.sort.bind(null, 'email')}>Email</th>
                        </tr>
                    </thead>
                    <Tbody users = {this.state.users} />
                </table>
            );
        }
    });
    
    ReactDOM.render(<Table />, document.getElementById("root"));
})();