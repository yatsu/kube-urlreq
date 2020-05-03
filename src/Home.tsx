import React from 'react'
import { Box, Button, Heading } from 'rebass'

import './Home.css'

class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <Box variant="styles.root" p={3} sx={{ textAlign: 'center' }}>
        <Heading as="h1" mb={4}>
          Rebass Sandbox
        </Heading>
        <Button variant="primary" mr={3}>
          Beep
        </Button>
        <Button variant="outline">Boop</Button>
      </Box>
    )
  }
}

export default Home
