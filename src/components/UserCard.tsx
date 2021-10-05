import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

export const UserCard = (props: any) => {
  const user = props.userData;
  const isProfessions: string =
    user.professions.length !== 0 ? 'inline' : 'none';
  const bold = {
    fontWeight: 700,
  };

  return (
    <Card sx={{ maxWidth: 345, height: 300 }}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar alt={user.name} src={user.thumbnail} />}
          title={
            <Typography gutterBottom variant='h6' component='div'>
              {user.name}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant='body2' component={'div'} color='text.secondary'>
            <span style={{ display: isProfessions, fontWeight: 700}}>Profession: </span>
            {user.professions.map((item: string, index: number) => (
              <span key={item}>
                {item}
                {index < user.professions.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span style={bold}>Age:</span> {user.age}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span style={bold}>Weight:</span> {user.weight}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span style={bold}>Height:</span> {user.height}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span style={bold}>Hair Color:</span> {user.hair_color}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={Link}
          to={`/detail/${user.id}`}
          key={user.id}
          color='primary'
          size='small'
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};
