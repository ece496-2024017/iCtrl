import React from 'react';

import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Hidden,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import ictrlLogo from '../../../icons/logo.png';
import LogIn from '../../components/LogIn';

import './index.css';
import {addScript} from '../../utils';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowsCount: 0,
      macIntelCount: 0,
      macARMCount: 0,
    };
  }

  handleDesktopDownload = (ev) => {
    const platform = ev.target.id;
    let download_link = 'https://github.com/junhaoliao/iCtrl/releases/latest/download/';
    if (platform === 'download-windows') {
      download_link += 'ictrl-desktop-setup.exe';
    } else if (platform === 'download-mac-intel') {
      download_link += 'ictrl-desktop-darwin-x64.dmg';
    } else if (platform === 'download-mac-arm') {
      download_link += 'ictrl-desktop-darwin-arm64.dmg';
    }
    window.location.href = download_link;
  };

  updateDownloadCount = () => {
    axios.get('https://api.github.com/repos/junhaoliao/iCtrl/releases/latest').then((response) => {
      const {assets} = response.data;
      let windowsCount = 0;
      let macIntelCount = 0;
      let macARMCount = 0;
      for (const asset of assets) {
        if (asset['name'].includes('exe') || asset['name'].includes('nupkg')) {
          windowsCount += asset['download_count'];
        } else if (asset['name'].includes('x64')) {
          macIntelCount += asset['download_count'];
        } else if (asset['name'].includes('arm64')) {
          macARMCount += asset['download_count'];
        }
      }
      this.setState({
        windowsCount: windowsCount,
        macIntelCount: macIntelCount,
        macARMCount: macARMCount,
      });
    });
  };

  componentDidMount() {
    axios.get('/api/userid').then(response => {
      window.location = '/dashboard';
    }).catch(_ => {
      this.updateDownloadCount();
    });

    addScript('https://buttons.github.io/buttons.js');
  }

  render() {
    const {windowsCount, macIntelCount, macARMCount} = this.state;
    const countSum = windowsCount + macIntelCount + macARMCount;

    return (
        <div style={{height: '100vh'}}>
          <AppBar position="absolute" color={'info'}>
            <Toolbar>
              <img src={ictrlLogo} style={{background: 'white', height: 30, width: 30, marginRight: 10}}
                   alt=""/>
              <Typography style={{flex: 1, fontWeight: 'bold'}} variant="h6">
                iCtrl
              </Typography>
              <a aria-label="Star junhaoliao/iCtrl on GitHub" className="github-button" data-icon="octicon-star"
                 data-show-count="true"
                 data-size="large" href="https://github.com/junhaoliao/iCtrl">Star</a>
            </Toolbar>
          </AppBar>

          <Box sx={{display: 'flex', height: '100%'}}>
            <Hidden mdDown>
              <Box sx={{flex: 5, marginTop: '30px', alignSelf: 'center', alignItems: 'center'}}>
                <img style={{
                  display: 'block',
                  maxWidth: '200px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                     src={ictrlLogo} alt=""/>
                <br/><br/>

                <Typography
                    align={'center'}
                    variant={'h5'}>
                  Connect to uoft engineering labs in 5 seconds.
                </Typography>
                <br/><br/>

                <Stack direction={'row'} alignItems={'center'} spacing={3} justifyContent={'center'}>
                  <Tooltip title={countSum>0?`Total Download: ${countSum}`:null}>
                    <Typography>
                    Desktop Client:
                    </Typography>
                  </Tooltip>
                  <ButtonGroup>
                    <Tooltip title={windowsCount>0?`Download: ${windowsCount}`:null}>
                      <Button id={'download-windows'} onClick={this.handleDesktopDownload}>
                      Windows
                    </Button>
                    </Tooltip>
                    <Tooltip title={macIntelCount>0?`Download: ${macIntelCount}`:null}>
                      <Button id={'download-mac-intel'} onClick={this.handleDesktopDownload}>
                      Intel Mac
                    </Button>
                    </Tooltip>
                    <Tooltip title={macARMCount>0?`Download: ${macARMCount}`:null}>
                      <Button id={'download-mac-arm'} onClick={this.handleDesktopDownload}>
                      M1 Mac
                    </Button>
                    </Tooltip>
                  </ButtonGroup>
                </Stack>
              </Box>
            </Hidden>

            <Divider orientation="vertical" flexItem/>

            <Box sx={{flex: 3}}>
              {/* add an empty toolbar to prevent elements below being covered*/}
              {/*https://mui.com/components/app-bar/#fixed-placement*/}
              <Toolbar/>
              <LogIn/>
            </Box>
          </Box>

        </div>
    );
  }
}


