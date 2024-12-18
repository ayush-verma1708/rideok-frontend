import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Replace with your Instagram Access Token
  const ACCESS_TOKEN = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
  const INSTAGRAM_API_URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${ACCESS_TOKEN}`;

  useEffect(() => {
    // Fetch data from Instagram API
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(INSTAGRAM_API_URL);
        const data = await response.json();

        if (data.data) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching Instagram data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <Container className='my-5'>
      <h2 className='text-center mb-4'>Latest from Instagram</h2>

      {isLoading ? (
        <div className='text-center'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {posts.slice(0, 6).map((post) => (
            <Col key={post.id} md={4} className='mb-4'>
              <Card>
                {post.media_type === 'IMAGE' ||
                post.media_type === 'CAROUSEL_ALBUM' ? (
                  <Card.Img
                    variant='top'
                    src={post.media_url}
                    alt='Instagram Post'
                  />
                ) : (
                  <iframe
                    src={post.media_url}
                    title='Instagram Video'
                    style={{ width: '100%', height: '200px' }}
                  ></iframe>
                )}
                <Card.Body>
                  <Card.Text>
                    {post.caption
                      ? post.caption.substring(0, 80) + '...'
                      : 'No Caption'}
                  </Card.Text>
                  <a
                    href={post.permalink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-primary btn-sm'
                  >
                    View on Instagram
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default InstagramFeed;
