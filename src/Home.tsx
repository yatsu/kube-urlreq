import React from 'react'
import { Box, Button, Flex, Heading } from 'rebass'
import { Input } from '@rebass/forms'

import './Home.css'

class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <Box as="form" variant="styles.root" p={3} sx={{ textAlign: 'center' }}>
        <Heading as="h1" mb={4}>
          URL Request Check
        </Heading>
        <Flex>
          <Input id="name" name="name" defaultValue="Jane Doe" />
          <Button variant="primary" mr={3}>
            GET
          </Button>
        </Flex>
      </Box>
    )
  }
}

export default Home
