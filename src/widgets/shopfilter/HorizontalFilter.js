/**
 * Shop Page Side Bar Filter
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container, Form, Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu,Button} from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { uniqueCategory, uniqueSizes, uniqueColors, uniqueMinMaxPrice } from '../../services';
import { categoryValue, sizeValue, colorValue, priceValue } from '../../actions/filter';
import'./styles.css';

var removecate = new Array();
class HorizontalFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pricefilter: false,
            isOpen: false,
            colorfilter:true,
            categoryfilter:false,
            sizefilter:false,
            colordrop:false,
            removecolorlist:[]
        }
        this.pricefilter_toggle = this.pricefilter_toggle.bind(this);
        //this.colorfilter_toggle = this.colorfilter_toggle.bind(this);
        this.colordrop=this.colordrop.bind(this);
        this.categoryfilter_toggle = this.categoryfilter_toggle.bind(this);
        this.sizefilter_toggle = this.sizefilter_toggle.bind(this);
        this.showfilter = this.showfilter.bind(this);
        this.closefilter = this.closefilter.bind(this);
    }
    showfilter(){
        document.getElementById("off-canvas-filter").setAttribute("class","off-canvas-filter-show");
        document.getElementById("site-header-row").setAttribute("class","off-canvas-overlay");
    }
    closefilter(){
        document.getElementById("site-header-row").setAttribute("class","site-header-row");
        document.getElementById("off-canvas-filter").setAttribute("class","off-canvas-filter");
       
    }
    pricefilter_toggle() {
        this.setState({
            pricefilter: !this.state.pricefilter
        });
    }
    // colorfilter_toggle() {
    //     this.setState({
    //         colorfilter: !this.state.colorfilter
    //     });
    // }
    categoryfilter_toggle() {
        this.setState({
            categoryfilter: !this.state.categoryfilter
        });
    }
    sizefilter_toggle() {
        this.setState({
            sizefilter: !this.state.sizefilter
        });
    }

    colordrop()
    {
        this.setState(prevState => ({
            colordrop: !prevState.colordrop
        }));       
    }


    onClickColorFilter = (event, colors) => {
        var index = colors.indexOf(event.target.value);
        if (event.target.checked) {
            colors.push(event.target.value);
        }
        else {
            colors.splice(index, 1);
        }
        if(colors.length > 0)
        {
            console.log('okat')
            this.setState({
                removecolorlist:colors,
                colorfilter:false
            })
        }
        else
        {
            console.log('not okat')
            this.setState({
                colorfilter:true
            })
        }
        this.props.colorValue(colors)
    }

    onClickCategoryFilter(event, categorys) {

        var index = categorys.indexOf(event.target.value);
        if (event.target.checked) {
            categorys.push(event.target.value);
        }
        else {
            categorys.splice(index, 1);
        }
        this.props.categoryValue(categorys);
    }

    onClickSizeFilter(event, sizes) {
        var index = sizes.indexOf(event.target.value);
        if (event.target.checked) {
            sizes.push(event.target.value);
        }
        else {
            sizes.splice(index, 1);
        }
        this.props.sizeValue(sizes);
    }
    Capitalize(str){
            var i=0;
            for(i;i<str.length;i++)
            {
                str=str.replace('-',' ');
                str=str.replace(/\d+/g, '');
            }
            return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll); 
      }
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }
      
      handleScroll(event) {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;

        if(scrollTop > 100)
        {
            document.getElementById("sticky-filter").setAttribute("class","sticky-filter is-sticky");
        } else {
            document.getElementById("sticky-filter").setAttribute("class","sticky-filter");
        }
      }

    render() {
        const {colorfilter,colordrop,removecolorlist} = this.state;
        const sizeFilterValues = this.props.filters.size;
        const categoryFilterValues = this.props.filters.category;
        const colorsFilterValues = this.props.filters.color;
        var totalcolor=removecolorlist.length;
        if (this.props.filters.value.max > 2000) {
            this.props.filters.value.max = 2000;
        }
        if (this.props.filters.value.min < 20) {
            this.props.filters.value.min = 20;
        }
        return (
            <div className="d-flex align-items-center filters-wrapper">
                <p class="mb-0 filter-title"><i className="fa fa-filter"></i> Filter by</p>
                 <Button onClick={this.showfilter} className="btn-filter">
                 <i className="fa fa-filter"> </i> Filter by
                </Button>
                <Dropdown isOpen={this.state.pricefilter} toggle={this.pricefilter_toggle} className="horizontal-filter-dropdown">
                    <DropdownToggle caret className="btn-white">
                        <span className="mb-0">Filter by Price</span>
                    </DropdownToggle>
                    <DropdownMenu className="price-filter">
                        <DropdownItem className="nav-link">                
                        <div className="widget widget_price_filter">
                            <div classs="shop-filter shop-filter-product-price widget_price_filter">
                                <div className="shop-filter-wrapper">

                                    <div className="price_slider_wrapper">
                                        <InputRange
                                            maxValue={this.props.prices.max}
                                            minValue={this.props.prices.min}
                                            value={this.props.filters.value}
                                            onChange={value => this.props.priceValue({ value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className="horizontal-filter-dropdown">
                    {(colorfilter) ?
                       <Button caret className="btn-white"  onClick={this.colordrop}>
                            <span className="mb-0">Filter by Color</span>
                        </Button>
                    :
                        <Button caret className="btn-white" onClick={this.colordrop}>Color: <b>{(removecolorlist.length === 1) ? this.Capitalize(removecolorlist[0]) : this.Capitalize(removecolorlist[0]) +'+'+(totalcolor-1)}</b></Button>
                    }
                 
                    
                    {(colordrop) ? 
                    <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                        <h4 className="widget-title">Filter by Color</h4>
                        <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px' }}>
                            <ul className="pgs-widget-layered-nav-list" tabIndex={0} style={{ right: '-17px' }}>
                                {this.props.colors.map((color, index) => {
                                    return (
                                        <div className="form-check pgs-filter-checkbox" key={index}>
                                            <input type="checkbox" onClick={(e) => this.onClickColorFilter(e, colorsFilterValues)} value={color} defaultChecked={colorsFilterValues.includes(color) ? true : false} className="form-check-input" id={color} />
                                            <label className="form-check-label"
                                                htmlFor={color}>{color}</label>
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    :null}
                </div>



                <Dropdown isOpen={this.state.categoryfilter} toggle={this.categoryfilter_toggle} className="horizontal-filter-dropdown">
                    <DropdownToggle caret className="btn-white">


                        <span className="mb-0">Product Categories</span>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="nav-link">               

                        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                    <h4 className="widget-title">Product Categories</h4>
                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '215px' }}>
                        {this.props.categorys.map((category, index) => {
                            return (
                                <div className="form-check pgs-filter-checkbox" key={index}>
                                    <input type="checkbox" onClick={(e) => this.onClickCategoryFilter(e, categoryFilterValues)} value={category} defaultChecked={categoryFilterValues.includes(category) ? true : false} className="form-check-input" id={category} />
                                    <label className="form-check-label"
                                        htmlFor={category}>{category}</label>
                                </div>)
                        })}
                    </div>
                </div>
                        </DropdownItem>

                    </DropdownMenu>
                </Dropdown>



                <Dropdown isOpen={this.state.sizefilter} toggle={this.sizefilter_toggle} className="horizontal-filter-dropdown">
                    <DropdownToggle caret className="btn-white">


                        <span className="mb-0">Filter by Size</span>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="nav-link">               

                        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                    <h4 className="widget-title">Filter by Size</h4>
                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '215px' }}>

                        {this.props.sizes.map((size, index) => {
                            return (

                                <div class="form-check pgs-filter-checkbox">
                                    <input type="checkbox" onClick={(e) => this.onClickSizeFilter(e, sizeFilterValues)} value={size} defaultChecked={sizeFilterValues.includes(size) ? true : false} class="form-check-input" id={size} />
                                    <label class="form-check-label" htmlFor={size}>{size}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                        </DropdownItem>

                    </DropdownMenu>
                </Dropdown>
                <div className="site-header-row" id="site-header-row"></div>
                <div className="off-canvas-filter" id="off-canvas-filter">
                <div class="sidebar-widget-heading">
					<a href="#" onClick={this.closefilter} class="close-sidebar-widget">Close</a>
				</div>
            <div className="widget widget_price_filter">
                <h4 className="widget-title">Filter by Price</h4>
                <div classs="shop-filter shop-filter-product-price widget_price_filter">
                    <div className="shop-filter-wrapper">

                    <div className="price_slider_wrapper">
                        <InputRange
                            maxValue={this.props.prices.max}
                            minValue={this.props.prices.min}
                            value={this.props.filters.value}
                            onChange={value => this.props.priceValue({ value })} />
                    </div>
                    </div>
                </div>
            </div>
            <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                <h4 className="widget-title">Filter by Color</h4>
                <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{height: '210px'}}>
                    <ul className="pgs-widget-layered-nav-list" tabIndex={0} style={{right: '-17px'}}>
                     {this.props.colors.map((color, index) => {
                             return (
                                    <div className="form-check pgs-filter-checkbox" key={index}>
                                        <input type="checkbox" onClick={(e) => this.onClickColorFilter(e,colorsFilterValues)} value={color} defaultChecked={colorsFilterValues.includes(color)? true : false}  className="form-check-input" id={color} />
                                        <label className="form-check-label"
                                            htmlFor={color}>{color}</label>
                                    </div>
                                )
                        })}
                    </ul>
                </div>
            </div>
            <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                <h4 className="widget-title">Product Categories</h4>
                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{height: '215px'}}>
                     {this.props.categorys.map((category, index) => {
                                        return (
                                            <div className="form-check pgs-filter-checkbox" key={index}>
                                                <input type="checkbox" onClick={(e) => this.onClickCategoryFilter(e,categoryFilterValues)} value={category} defaultChecked={categoryFilterValues.includes(category)? true : false}  className="form-check-input" id={category} />
                                                <label className="form-check-label"
                                                       htmlFor={category}>{category}</label>
                                            </div> )
                        })}
                </div>
             </div>
            <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                <h4 className="widget-title">Filter by Size</h4>
                <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{height: '215px'}}>

                    {this.props.sizes.map((size, index) => {
                        return (

                                <div class="form-check pgs-filter-checkbox">
                                    <input  type="checkbox" onClick={(e) => this.onClickSizeFilter(e, sizeFilterValues)} value={size}  defaultChecked={sizeFilterValues.includes(size)? true : false}  class="form-check-input" id={size} />
                                    <label class="form-check-label" htmlFor={size}>{size}</label>
                                </div>
                            )
                        })}
                </div>
             </div>
        </div>

            </div>
            
        )
    }
}

const mapDispatchToProps = state => ({
    categorys: uniqueCategory(state.data.products),
    sizes: uniqueSizes(state.data.products),
    colors: uniqueColors(state.data.products),
    prices: uniqueMinMaxPrice(state.data.products),
    filters: state.filters
})
export default connect(
    mapDispatchToProps,
    { categoryValue, sizeValue, colorValue, priceValue }
)(HorizontalFilter);

