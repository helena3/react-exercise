import { Avatar, Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Detail = (props: any) => {
  const id = props.match.params.id;
  const bold = {
    fontWeight: 700,
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  const [detail, setDetail] = useState<any>({});
  const [friends, setFriends] = useState<any>([]);

  const fetchUserData = async (userId: number) => {
    const url =
      'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';
    const response = await fetch(url);
    const data = await response.json();
    const users = data.Brastlewark;
    const userData = users.find((data: any) => data.id === Number(userId));

    const userFriends = userData.friends
      .map((el: string) => users.find((item: any) => item.name === el))
      .filter((y: any) => y !== undefined);

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
        <span style={{ display: isProfession, fontWeight: 700 }}>
          Profession:{' '}
        </span>
        {detail.professions &&
          detail.professions.map((profession: string) => (
            <ul>
              <li key={profession}>{profession}</li>
            </ul>
          ))}
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
        <span style={{ display: isFriend, fontWeight: 700 }}>Friends: </span>
        {friends.map((friend: any) => (
          <ul>
            <li key={friend.name}>
              <Link to={`/detail/${friend.id}`}>{friend.name}</Link>
            </li>
          </ul>
        ))}
      </Typography>
    </Container>
  );
};

export default Detail;
