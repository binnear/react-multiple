import * as React from "react";
import { connect } from 'react-redux';
import { demo } from '../../../actions/index/index'
import Tappable from 'react-tappable/lib/Tappable';
class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }
  changeValue(e) {
    console.log(e.target)
    const { demo } = this.props;
    demo('ok')
  }
  render() {
    const { data } = this.props
    return <Tappable onTap={this.changeValue}>
      <div className="demo">
        <i className="iconfont icon-close-blod"></i>
        {data}
      </div>
    </Tappable>
  }
}

const mapStateToProps = (state) => ({
  data: state.demo.data
})

const mapDispatchToProps = {
  demo
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);