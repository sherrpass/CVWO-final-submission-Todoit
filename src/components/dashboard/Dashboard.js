import React from "react";
import { connect } from "react-redux";
import { getTodos } from "../../actions/todos";
import { getCategories } from "../../actions/categories";
import CategoriesSidebar from "./CategoriesSidebar";
import BoardTopSection from "./BoardTopSection";
import BoardMainSection from "./BoardMainSection";
import Loading from "../layout/Loading";

class Dashboard extends React.Component {
    mm = window.matchMedia("(min-width: 768px)");
    handler = (e) => {
        this.setState(() => ({
            showSideBar: e.matches,
            largeWidth: e.matches,
        }));
    };
    state = {
        largeWidth: this.mm.matches,
        showSideBar: this.mm.matches,
    };
    componentDidMount() {
        this.props.getTodos();
        this.props.getCategories();
        this.mm.addListener(this.handler);
    }
    componentWillUnmount() {
        this.mm.removeListener(this.handler);
    }
    toggleSideBar = () => {
        this.setState((prevState) => ({
            showSideBar: !prevState.showSideBar,
        }));
    };
    render() {
        return this.props.loading ? (
            <Loading />
        ) : (
            <div className="dashboard">
                <div
                    className={
                        "categories-sidebar" +
                        (this.state.showSideBar ? "" : " closed")
                    }
                >
                    <CategoriesSidebar
                        onClickCollaspe={this.toggleSideBar}
                        showSideBar={this.state.showSideBar}
                    />
                </div>
                <div
                    className={
                        "board" +
                        (this.state.showSideBar ? "" : " closed") +
                        (this.state.largeWidth ? " large" : " small")
                    }
                    onClick={() => {
                        this.state.showSideBar &&
                            !this.state.largeWidth &&
                            this.toggleSideBar();
                    }}
                >
                    <BoardTopSection />
                    <BoardMainSection />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.category.loading || state.todo.loading,
});
export default connect(mapStateToProps, {
    getTodos,
    getCategories,
})(Dashboard);
