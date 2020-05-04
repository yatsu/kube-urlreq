/** @jsx jsx */
import React from 'react'
import { Box, Button, Flex, Heading, Input, jsx } from 'theme-ui'

type Props = {}

type State = {
  url: string
  status?: number
  statusText?: string
  responseText?: string
  fetching: boolean
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      url: 'http://example.default.svc.cluster.local/',
      fetching: false
    }
  }

  private handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    if (this.state.fetching) return

    this.setState({
      fetching: true,
      status: undefined,
      statusText: 'Requesting...',
      responseText: undefined
    })

    const res = await fetch('fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: this.state.url })
    })
    this.setState({ status: res.status, statusText: res.statusText })
    const responseText = await res.text()

    this.setState({
      fetching: false,
      status: res.status,
      statusText: res.statusText,
      responseText
    })
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    this.setState({ url: event.target.value })
  }

  public render() {
    return (
      <Box variant="styles.root" p={4}>
        <Heading as="h1" mb={4} sx={{ textAlign: 'center' }}>
          URL Request Check
        </Heading>
        <Flex as="form" m={4} onSubmit={this.handleSubmit}>
          <Input
            m={2}
            id="url"
            name="url"
            value={this.state.url}
            disabled={this.state.fetching}
            onChange={this.handleChange}
          />
          <Button m={2} variant="primary" mr={3} disabled={this.state.fetching}>
            GET
          </Button>
        </Flex>
        <Heading as="h4" sx={{ textAlign: 'center' }}>
          Browser &rarr; kube-urlreq (Pod) &rarr; URL
        </Heading>
        <Box
          m={4}
          px={3}
          py={2}
          sx={{ minHeight: 200, borderWidth: 1, borderColor: '#888', borderStyle: 'solid' }}
        >
          <Heading as="h3" my={1}>
            {this.state.status} {this.state.statusText}
          </Heading>
          <Box sx={{ whiteSpace: 'pre-wrap' }}>{this.state.responseText}</Box>
        </Box>
      </Box>
    )
  }
}

export default Home
