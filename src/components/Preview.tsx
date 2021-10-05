import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
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

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    setLoading(true);
    const url =
      'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';
    const data = await fetch(url);
    const users = await data.json();
    setUsers(users.Brastlewark);
    setLoading(false);
  };

  return loading ? (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress disableShrink />
    </div>
  ) : (
    <div>
      <Typography
        variant='h4'
        color='text.primary'
        align='center'
        sx={{ mb: 4, mt: 4 }}
      >
        Preview Users
      </Typography>
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
