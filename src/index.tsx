import qs from 'qs'
import React from 'react'
import ReactDOM from 'react-dom'

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
  public constructor(props: IAppProps) {
    super(props)
    const { she = this.defaultShe, me = this.defaultMe } = qs.parse(
      window.location.hash.substr(1),
    )
    this.state = { she, me }
  }
  public componentDidMount() {
    // this.updateShareUrl()
  }
  public render() {
    const { she, me, shareUrl } = this.state
    return (
      <div className="App">
        <div className="comments">
          <h1>Tell your story</h1>
          <div className="comment">
            <label>Well, she said</label>
            <input
              type="text"
              name="shesaid-input"
              id="shesaid-input"
              onChange={this.handleUpdateShe}
              onKeyDown={this.handleKeyDown}
              placeholder={she}
            />
          </div>
          <div className="comment">
            <label>&hellip;so I said</label>
            <input
              type="text"
              name="isaid-input"
              id="isaid-input"
              onChange={this.handleUpdateMe}
              onKeyDown={this.handleKeyDown}
              placeholder={me}
            />
          </div>
          </div>
        <Mansplain
          style={{ width: '100vw', display: 'block' }}
          sheSaid={she}
          iSaid={me}
        />
          <div className="share"><label htmlFor="">Share your story: </label>
          {shareUrl 
              ? <div className="share__group">
                 <input type="text" value={shareUrl} readOnly />
                 <a href={shareUrl} title="Open this link in a new tab" target="_blank">🚀</a>
               </div>
            : <button className="share-button" onClick={this.updateShareUrl}>Get a share url</button>
          }
          </div>
          <div className="credits">
            Inspiration and original image from<br />
            <a href="https://twitter.com/newscientist/status/1057790476806471681" target="_blank">https://twitter.com/newscientist/status/1057790476806471681</a>
          </div>
          <div className="credits">
            <a href="https://codesandbox.io/s/github/programbo/mansplain/tree/master/">
              <img alt="Edit mansplain" src="https://codesandbox.io/static/img/play-codesandbox.svg" />
            </a>
          </div>
        </div>
    )
  }
  private handleUpdateShe = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { she: e.currentTarget.value || this.defaultShe, shareUrl: undefined }
    )
  }
  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
      const image = document.querySelector('.image')
      if (image) {
         window.scrollTo({
           top: image.getBoundingClientRect().top + window.scrollY,
           left: 0,
           behavior: 'smooth'
         })
      }
    }
  }
  private handleUpdateMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      { me: e.currentTarget.value || this.defaultMe, shareUrl: undefined }
    )
  }
  private updateShareUrl = () => {
    const origin = location.origin
    const { she, me } = this.state
    const query = qs.stringify({ she, me })
    const shareUrl = `${origin}#${query}`
    this.setState({ shareUrl })    
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
