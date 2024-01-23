import HashLoader from "react-spinners/HashLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Loader = () => {

    return (
        <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <HashLoader size={100} color="#36d7b7" />
        </div>
    );
};

export default Loader;