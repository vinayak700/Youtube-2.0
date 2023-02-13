import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import { Box, Typography, Stack, Card, CardMedia } from '@mui/material';
import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
            .then(data => setVideoDetail(data.items[0]));
        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then(data => setVideos(data.items));
        fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=10`)
            .then(data => setComments(data.items));

    }, [id]);

    if (!videoDetail?.snippet) return 'Loading...';

    const { snippet: { title, channelId, channelTitle, publishedAt, description }, statistics: { viewCount, likeCount, commentCount } } = videoDetail;


    return (
        <Box minHeight='95vh'>
            <Stack flexDirection='column'>
                <Box flex='1'>
                    <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
                        <Typography color='#fff' variant='h5' fontWeight='bold' paddingTop={2} px={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            {title}
                            <Stack direction='row' gap='20px' alignItems='center'>
                                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                                    {parseInt(commentCount).toLocaleString()} comments
                                </Typography>
                                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Typography>
                        <Typography color='#fff' variant='body1' sx={{ opacity: 0.7 }} px={2}>
                            {publishedAt.slice(0, 10)}
                        </Typography>
                        <Stack direction='row' justifyContent='space-between' color='#fff' py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color='#fff'>
                                    {channelTitle}
                                    <span className='material-icons' style={{ fontSize: '12px', color: 'gray', marginLeft: '5px' }}>check_circle</span>
                                </Typography>

                            </Link>

                        </Stack>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Stack sx={{ p: '16px', color: 'white' }}>
                        <Typography variant='h5' sx={{ paddingBottom: '5px' }}>
                            Description:
                        </Typography>
                        {description}
                        <Typography variant='h6' sx={{ marginTop: '20px', paddingBottom: '1px' }}>
                            Comments:
                        </Typography>

                        {comments ?
                            comments.map((comment, i) => (
                                <Card key={comment.id} sx={{ display: 'flex', flexDirection: 'row', paddingTop: '20px', alignItems: 'self-start', backgroundColor: '#434543', color: 'white' }}>
                                    <Link to={`/channel/${comment.snippet.topLevelComment.snippet.authorChannelId.value}`}>
                                        <CardMedia image={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                            alt={comment.snippet.topLevelComment.snippet.authorDisplayName} sx={{ width: { lg: '50px', md: '40px', xs: '30px' }, height: { lg: '50px', md: '40px', xs: '30px' }, borderRadius: '50%', m: '10px', display: 'flex', alignSelf: 'flex-start' }} />
                                    </Link>
                                    <Stack>
                                        <Stack flexDirection={'row'} gap={3}>
                                            <Link to={`/channel/${comment.snippet.topLevelComment.snippet.authorChannelId.value}`}>
                                                <Typography variant='body1' fontWeight='bold' color={'white'}>
                                                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                                                </Typography>
                                            </Link>
                                            <Typography variant='body1' sx={{ opacity: 0.7 }}>
                                                {comment.snippet.topLevelComment.snippet.publishedAt.slice(0, 10)} - {comment.snippet.topLevelComment.snippet.publishedAt.slice(11, 19)}
                                            </Typography>
                                        </Stack>
                                        <Typography>
                                            {comment.snippet.topLevelComment.snippet.textOriginal}
                                        </Typography>
                                        <Stack sx={{ display: 'flex', flexDirection: 'row', width: '1px', gap: '15px' }}>
                                            <Box className='material-icons' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '5px' }}>
                                                thumb_up <Typography variant='body2' fontWeight={'bold'}>{parseInt(comment.snippet.topLevelComment.snippet.likeCount).toLocaleString()}</Typography>
                                            </Box>
                                            <Box className='material-icons'>
                                                thumb_down
                                            </Box>
                                            <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row' }}>
                                                {parseInt(comment.snippet.topLevelComment.totalReplyCount).toLocaleString()} 
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Card>
                            )) :
                            <Typography variant='h6'>
                                'No Comments Found!'
                            </Typography>
                        }
                    </Stack>
                    <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
                        <Videos videos={videos} direction='column' />
                    </Box>
                </Box>
            </Stack>
            <Stack>

            </Stack>
        </Box>
    )
}

export default VideoDetail