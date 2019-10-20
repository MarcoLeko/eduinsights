import * as React from 'react';
import {useEffect, useRef} from 'react';
import {Box} from '@material-ui/core';
import CountUp from 'react-countup';
import Container from "@material-ui/core/Container";
import Books from '../../assets/books-image.png';
import "./donations-overview.scss";
import Typography from "@material-ui/core/Typography";

export default function DonationsOverview() {
    const countUpElm = useRef(null);
    const [countUp, setCountUp] = React.useState(false);

    useEffect(() => {

            const observer = new IntersectionObserver((entries) => {
                console.log(entries[0])
                if (entries[0].isIntersecting) {
                    setCountUp(true);
                } else {
                    setCountUp(false);

                }
            }, {
                threshold: [.5],
                root: document.querySelector('div.react-swipeable-view-container')[0]
            });
            observer.observe(countUpElm.current.containerRef.current);
            return () => observer.disconnect();

    }, []);
    return (
        <React.Fragment>
            <Container>
                <Box p={3}>
                    Education is a fundamental driver of personal, national and global development.
                    Investing in education is extremely important if you are a parent or even if you want to further
                    yourself professionally.
                    It is unlikely that there is ever a point in anyone’s life where learning and furthering yourself
                    becomes unimportant or unnecessary.
                    It is only through education that people are able to improve themselves. One of the most important
                    factors for escaping from poverty is education.
                    As the world evolves and becomes technologically savvy,
                    it is reasonable to expect that the demand for high-level skills will increase over time and that
                    children will need to be adequately skilled to apply for such positions. Simply completing grade 12
                    will not be sufficient for future job hunters.
                    Keep in mind that a university degree increases in value with every generation and you would want
                    your children to be part of the fortunate few that could further their education, thanks to your
                    sacrifices.
                    The option of an educational loan is always a great way to ensure that your child does not get left
                    behind the tertiary curve.
                </Box>
            </Container>

            <img className="books" src={Books} alt="Books for care"/>

            <Typography variant="h6" align="center">
                We already collected
            </Typography>
            <Box className="summed-donations-panel" p={3}>
                <CountUp
                    className="counting-numbers"
                    start={0}
                    end={160527.12}
                    duration={5}
                    separator=" "
                    decimals={2}
                    decimal=","
                    suffix=" $ donated"
                    onEnd={() => console.log('Ended! 👏')}
                    onPauseResume={() => console.log('Paused!')}
                    onStart={() => console.log('Started! 💨')}
                    ref={countUpElm}
                >  {({countUpRef, start, pauseResume}) => (
                    <React.Fragment>
                        <span
                            ref={countUpRef}/>
                    </React.Fragment>
                )}</CountUp>
            </Box>
            <Typography variant="h6" align="center">
                Thanks to every anonymous donor.
            </Typography>
        </React.Fragment>
    );
}

// const useIntersect = ({root = null, rootMargin, threshold = 0}) => {
//     const [entry, updateEntry] = useState({});
//     const [node, setNode] = useState(null);
//     const observer = useRef(null);
//
//     useEffect(() => {
//         if (observer.current) {
//             observer.current.disconnect();
//         }
//
//         // eslint-disable-next-line react-hooks/rules-of-hooks
//         observer.current = useRef(new window.IntersectionObserver(([entry]) => updateEntry(entry), {
//             root,
//             rootMargin,
//             threshold
//         }));
//         const {current: currentObserver} = observer;
//
//         currentObserver.disconnect();
//
//         if (node) {
//             currentObserver.observe(node);
//         }
//
//         return () => currentObserver.disconnect();
//     }, [node, root, rootMargin, threshold]);
//
//     return [setNode, entry];
// };
