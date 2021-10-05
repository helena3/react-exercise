import React, { useEffect, useState } from 'react';
import { Avatar, Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { User } from './Preview';

interface Location {
  pathname: string;
  search: string;
  hash: string;
  key: string;
}

interface History {
  length: number;
  action: string;
  location: Location;
}

interface Location2 {
  pathname: string;
  search: string;
  hash: string;
  key: string;
}

interface Params {
  id: string;
}

interface Match {
  path: string;
  url: string;
  isExact: boolean;
  params: Params;
}

interface Props {
  history: History;
  location: Location2;
  match: Match;
}

const Detail: React.FunctionComponent<Props> = (props) => {
  const id: number = Number(props.match.params.id);
  const bold = {
    fontWeight: 700,
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  const [detail, setDetail] = useState<User>({
    id: 0,
    name: '',
    thumbnail: '',
    age: 0,
    weight: 0,
    height: 0,
    hair_color: '',
    professions: [],
    friends: []
  });
  const [friends, setFriends] = useState<User[]>([]);

  const fetchUserData = async (userId: number) => {
    const url =
      'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';
    const response = await fetch(url);
    const data = await response.json();
    const users = data.Brastlewark;
    
    const userData = users.find((data: User) => data.id === Number(userId));
    const userFriends = userData.friends
      .map((el: string) => users.find((item: User) => item.name === el))
      .filter((y: User) => y !== undefined);

    setDetail(userData);
    setFriends(userFriends);
  };

  const isProfession: string =
    detail.professions && detail.professions.length !== 0 ? 'inline' : 'none';
  const isFriend: string = friends.length !== 0 ? 'inline' : 'none';

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 8,
          marginTop: 5,
          justifyContent: 'center',
        }}
      >
        <Avatar
          alt={detail.name}
          src={detail.thumbnail}
          sx={{ width: 100, height: 100, marginRight: 5 }}
        />
        <Typography variant='h4' color='text.primary' gutterBottom>
          {detail.name}
        </Typography>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'right' }}>
        <Button
          component={Link}
          to={'/'}
          variant='contained'
          startIcon={<HomeIcon />}
        >
          Home
        </Button>
      </Box>
      <Typography
        component={'div'}
        variant='body1'
        color='text.primary'
        gutterBottom
      >
        <div style={{ display: isProfession, fontWeight: 700 }}>
          Profession:
        </div>
        <ul>
          {detail.professions &&
            detail.professions.map((profession: string) => (
              <li key={profession}>{profession}</li>
            ))}
        </ul>
      </Typography>
      <Typography variant='body1' color='text.primary' gutterBottom>
        <span style={bold}>Age:</span> {detail.age}
      </Typography>
      <Typography variant='body1' color='text.primary' gutterBottom>
        <span style={bold}>Weight:</span> {detail.weight}
      </Typography>
      <Typography variant='body1' color='text.primary' gutterBottom>
        <span style={bold}>Height:</span> {detail.height}
      </Typography>
      <Typography variant='body1' color='text.primary' gutterBottom>
        <span style={bold}>Hair Color:</span> {detail.hair_color}
      </Typography>
      <Typography
        component={'div'}
        variant='body1'
        color='text.primary'
        gutterBottom
      >
        <div style={{ display: isFriend, fontWeight: 700 }}>Friends: </div>
        <ul>
          {friends.map((friend: User) => (
            <li key={friend.name}>
              <Link to={`/detail/${friend.id}`}>{friend.name}</Link>
            </li>
          ))}
        </ul>
      </Typography>
    </Container>
  );
};

export default Detail;
