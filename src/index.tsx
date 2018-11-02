import qs from 'qs'
import React from 'react'
import ReactDOM from 'react-dom'
import TinyUrl from 'node-url-shortener'

import { Mansplain } from './mansplain'

import './styles.css'

interface IAppProps {}
interface IAppState {
  she: string
  me: string
  shareUrl?: string
}

class App extends React.PureComponent<IAppProps, IAppState> {
  defaultShe = 'Are you feeling my speech bub...'
  defaultMe = 'Nope.'
  public constructor(props) {
    super(props)
    const { she = this.defaultShe, me = this.defaultMe } = qs.parse(
      window.location.hash.substr(1),
    )
    this.state = { she, me }
  }
  public componentDidMount() {
    this.updateShareUrl()
  }
  public render() {
    const { she, me, shareUrl } = this.state
    return (
      <div className="App">
        <Mansplain
          style={{ width: '100vw', display: 'block' }}
          sheSaid={she}
          iSaid={me}
        />
        <div className="comments">
          <div className="comment">
            <label>Well, she said</label>
            <input
              type="text"
              name="shesaid"
              onChange={this.handleUpdateShe}
              placeholder={she}
            />
          </div>
          <div className="comment">
            <label>so I said</label>
            <input
              type="text"
              name="isaid"
              onChange={this.handleUpdateMe}
              placeholder={me}
            />
          </div>
          <div className="share">
            Share this: <a href={shareUrl}>{shareUrl}</a>
          </div>
        </div>
      </div>
    )
  }
  private handleUpdateShe = e => {
    this.setState(
      { she: e.currentTarget.value || this.defaultShe },
      this.updateShareUrl,
    )
  }
  private handleUpdateMe = e => {
    this.setState(
      { me: e.currentTarget.value || this.defaultMe },
      this.updateShareUrl,
    )
  }
  private updateShareUrl = () => {
    const origin = location.origin
    const { she, me } = this.state
    const query = qs.stringify({ she, me })
    window.location.hash = query
    const shareUrl = `${origin}#${query}`
    this.setState({ shareUrl })
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
