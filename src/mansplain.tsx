import * as React from 'react'
const ScaleText = require('react-scale-text')
import background from './conversation.svg'

interface iMansplain {
  sheSaid: string
  iSaid: string
  style?: React.CSSProperties
}

const speechStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  textAlign: 'center',
  lineHeight: 1,
  position: 'absolute',
  fontFamily: "'Poor Story', cursive",
  fontSize: 200,
  cursor: 'pointer',
}

export class Mansplain extends React.PureComponent<iMansplain, never> {
  public render() {
    const { sheSaid = 'I think...', iSaid = 'Nope', style } = this.props
    return (
      <div style={{ position: 'relative' }}>
        <img
          src="https://files-iyijjnvfna.now.sh/mansplain.svg"
          alt=""
          style={style}
        />
        <div
          id="shesaid"
          onClick={this.handleClickShe}
          style={{
            ...speechStyle,
            top: '42vw',
            left: '37vw',
            width: '20vw',
            height: '17vw',
          }}
        >
          <ScaleText minFontSize={5}>
            <span className="centered">{sheSaid}</span>
          </ScaleText>
        </div>
        <div
          id="isaid"
          onClick={this.handleClickMe}
          style={{
            ...speechStyle,
            top: '7vw',
            left: '30vw',
            width: '29vw',
            height: '22vw',
            fontWeight: 900,
          }}
        >
          <ScaleText minFontSize={8}>
            <span className="centered">{iSaid}</span>
          </ScaleText>
        </div>
      </div>
    )
  }
  private handleClickShe = (e: React.MouseEvent<HTMLDivElement>) => {
    document && document.getElementById('shesaid-input').focus()
  }
  private handleClickMe = (e: React.MouseEvent<HTMLDivElement>) => {
    document && document.getElementById('isaid-input').focus()
  }
}
