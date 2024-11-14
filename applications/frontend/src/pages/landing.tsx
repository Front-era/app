/*
import axios from 'axios';
import { useEffect, useState } from 'react';
*/

import Image from "next/image";
import BackgroundPlanet from "../assets/background-planet.png";
import BackgroundSurface from "../assets/background-surface.png";
import styles from "../app/landing.module.css";
import Logo from "../assets/logo.png";
import Rocket from "../assets/rocket.png";

export default function Landing() {
  /*
  const [users, setUsers] = useState<{ name: string }[]>([]);

  useEffect(() => {
    // Call the API route from the NestJS backend
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
  */

  /*
  * We have two images, the image of the planet from above
  * and the image of the surface of the planet.
  * 
  * As the user scrolls, we fade to the surface of the planet, as the
  * planet above transitions into the rocket, with the atmosphere
  * glint merging with the rocket glint. :)
  */

  return (
    <div className="relative items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div id="background-container-outer" className={styles.backgroundContainerOuter}>
        <div id="background-center" className={styles.backgroundCenter}>
          <div id="background-container" className={styles.backgroundContainerInner}>
            <div className={`w-full aspect-video ${styles.planetHorizon}`}>
              <Image
                src={Logo}
                alt={"Logo"}
                className="absolute left-[17.5%] top-[30%] w-[40%]"
              ></Image>
              <h1 className="text-sm text-white absolute left-[57.5%] top-[47.5%] lg:text-8xl">
                Coming Soon
              </h1>
              <h2 className="text-xs text-white absolute left-[55%] top-[57.5%] font-thin italic lg:text-4xl">
                Your Journey, Our Frontier.
              </h2>
            </div>

            <div id="surface-container" className={styles.surfaceContainer}>
              <div className={`w-full aspect-video ${styles.surfaceHorizon}`}>
                <h1 className="text-center relative font-medium text-white top-[50%] lg:text-8xl">
                  Population
                </h1>
                <h1 className="text-center relative font-medium text-sky-400 top-[50%] lg:text-9xl">
                  1000
                </h1>
              </div>

              <Image
                src={BackgroundSurface}
                alt={"Background"}
                id="background-surface"
                className={`object-fill w-[100%] ${styles.backgroundSurface}`}
              ></Image>

              <Image
                src={Rocket}
                alt={"Rocket"}
                id="rocket"
                className={styles.rocket}
              ></Image>
            </div>

            <Image
              src={BackgroundPlanet}
              alt={"Background"}
              id="background-planet"
              className={`object-fill w-[100%] ${styles.backgroundPlanet}`}
            ></Image>
          </div>
        </div>
      </div>
      <div id="gradient" className={styles.gradient}></div>
    </div>
  );
}
