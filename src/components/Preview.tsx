import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import UserCard from './UserCard';

export interface User {
  id: number;
  name: string;
  thumbnail: string;
  age: number;
  weight: number;
  height: number;
  hair_color: string;
  professions: string[];
  friends: string[];
}

const Preview: React.FunctionComponent = () => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const url =
      'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';
    const data = await fetch(url);
    const users = await data.json();
    setUsers(users.Brastlewark);
  };

  return (
    <div>
      <h1>Preview Users</h1>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {users.map((user) => (
          <Grid key={user.id} item xs={12} sm={6} md={4}>
            <UserCard key={user.id} userData={user} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Preview;
