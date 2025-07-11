import { useParams } from "react-router-dom";
import { GameHeader } from "@/components/game/GameHeader";
import { useGameDetailQuery } from "@/queries/useGameQuery";
import { Loader } from "@/components/ui/Loader";
import avatar from "@/images/sample-avatar.png";

export const Review = () => {
  const { id } = useParams();
  const userName = "TheFirstGamer";
  const { gameDetail, isLoading } = useGameDetailQuery(id);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <GameHeader
          background_image={gameDetail?.background_image}
          name={gameDetail?.name}
          isReview={true}
          slug={gameDetail?.slug}
        >
          <div className="flex flex-col items-center">
            <h2 className="mt-2 text-2xl font-bold">Test réalisé par </h2>
            <div className="flex items-center gap-2">
              <img
                src={avatar}
                className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                alt="Avatar du testeur"
              />
              <p className="text-sm">
                <span className="font-semibold">{userName}</span>, le 15/11/2023
                à 15h50
              </p>
            </div>
            <div className="mx-3 mt-5 flex flex-col items-center gap-4 rounded-md border-t border-global/20 p-4 shadow-md shadow-global">
              <p className="italic">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
                eum non inventore consequuntur officia adipisci impedit. Ad
                praesentium enim laborum voluptates quidem explicabo esse ullam
                quasi, id dolor voluptate dignissimos?
              </p>
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold">Univers et scénario</h2>
                <div className="flex w-full flex-col items-center justify-center">
                  <img
                    src={gameDetail?.background_image_additional as string}
                    alt={`Photo de ${gameDetail?.name}`}
                    className="h-[200px] w-[300px] object-cover sm:h-[300px] sm:w-4/5 lg:h-[400px]"
                    loading="lazy"
                  />
                  <p className="text-center text-sm italic">
                    L'univers est incroyable
                  </p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus corrupti modi enim deleniti facere vero repudiandae
                  magnam? Repellendus dignissimos id illum eum nostrum nulla?
                  Fuga earum incidunt officiis, tempore voluptate placeat
                  recusandae deleniti non, eos odit, quisquam porro? Minima,
                  blanditiis voluptas facere id et reprehenderit! Dolore aliquam
                  temporibus alias facere, consequatur et quidem omnis culpa
                  dolores, aperiam itaque sint similique mollitia enim nesciunt
                  sit earum labore quos, rem placeat ipsum. Eveniet, corrupti
                  nostrum sapiente odit magni magnam alias facilis! Harum eum
                  provident quibusdam id eius ea nesciunt, deserunt pariatur
                  velit itaque dolores tempora unde labore nam obcaecati
                  mollitia adipisci odio dolorum, quae possimus laboriosam
                  impedit fugiat accusamus? Magni odit quam cupiditate illum
                  deleniti totam voluptatibus omnis dolorum, molestias
                  blanditiis nulla doloremque praesentium ullam inventore sequi
                  quis fugiat saepe, provident quo debitis atque sed ad iusto.
                  Nobis natus suscipit sunt laborum fugiat veritatis illum iure
                  pariatur aliquam minima dolorum voluptate aperiam voluptatum
                  atque tempore est esse architecto dicta delectus, non neque
                  quos laboriosam magni. Ullam aspernatur pariatur quo
                  voluptatem, autem qui ipsa. Nesciunt iusto consequuntur
                  voluptas vel! Optio ipsam quaerat, repudiandae ducimus nihil
                  repellat vel ullam enim maiores dignissimos recusandae odio ea
                  ad voluptate? Doloribus expedita rem illum, vero eaque soluta
                  incidunt sit reiciendis cupiditate magnam quibusdam? Ducimus
                  ratione vitae omnis. Perspiciatis dolores earum corporis culpa
                  nihil beatae voluptatibus exercitationem veniam eligendi
                  possimus, tenetur nesciunt quibusdam nostrum, eum tempore ut
                  dolorem! Corrupti consequuntur asperiores possimus! Dolore at
                  voluptas vitae, voluptatem obcaecati id quibusdam quo repellat
                  quia laborum unde quas vero delectus rem deleniti velit
                  ratione itaque, eum praesentium. Reprehenderit voluptatibus
                  suscipit illum eligendi corrupti et ea aliquid non magnam sed
                  vitae assumenda officiis nihil tempora, quo atque odio
                  explicabo ullam perspiciatis? Perferendis delectus ullam
                  dolores ipsa laboriosam cum possimus cumque quam praesentium
                  aliquam earum alias, eos porro officia soluta et ducimus.
                </p>
                <div className="flex w-4/5 justify-center border-b border-global/40"></div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold">
                  Gameplay et prise en main
                </h2>
                <div className="flex w-full flex-col items-center justify-center">
                  <img
                    src={gameDetail?.background_image_additional as string}
                    alt={`Photo de ${gameDetail?.name}`}
                    className="h-[200px] w-[300px] object-cover sm:h-[300px] sm:w-4/5 lg:h-[400px]"
                    loading="lazy"
                  />
                  <p className="text-center text-sm italic">
                    Super fun à jouer
                  </p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus corrupti modi enim deleniti facere vero repudiandae
                  magnam? Repellendus dignissimos id illum eum nostrum nulla?
                  Fuga earum incidunt officiis, tempore voluptate placeat
                  recusandae deleniti non, eos odit, quisquam porro? Minima,
                  blanditiis voluptas facere id et reprehenderit! Dolore aliquam
                  temporibus alias facere, consequatur et quidem omnis culpa
                  dolores, aperiam itaque sint similique mollitia enim nesciunt
                  sit earum labore quos, rem placeat ipsum. Eveniet, corrupti
                  nostrum sapiente odit magni magnam alias facilis! Harum eum
                  provident quibusdam id eius ea nesciunt, deserunt pariatur
                  velit itaque dolores tempora unde labore nam obcaecati
                  mollitia adipisci odio dolorum, quae possimus laboriosam
                  impedit fugiat accusamus? Magni odit quam cupiditate illum
                  deleniti totam voluptatibus omnis dolorum, molestias
                  blanditiis nulla doloremque praesentium ullam inventore sequi
                  quis fugiat saepe, provident quo debitis atque sed ad iusto.
                  Nobis natus suscipit sunt laborum fugiat veritatis illum iure
                  pariatur aliquam minima dolorum voluptate aperiam voluptatum
                  atque tempore est esse architecto dicta delectus, non neque
                  quos laboriosam magni. Ullam aspernatur pariatur quo
                  voluptatem, autem qui ipsa. Nesciunt iusto consequuntur
                  voluptas vel! Optio ipsam quaerat, repudiandae ducimus nihil
                  repellat vel ullam enim maiores dignissimos recusandae odio ea
                  ad voluptate? Doloribus expedita rem illum, vero eaque soluta
                  incidunt sit reiciendis cupiditate magnam quibusdam? Ducimus
                  ratione vitae omnis. Perspiciatis dolores earum corporis culpa
                  nihil beatae voluptatibus exercitationem veniam eligendi
                  possimus, tenetur nesciunt quibusdam nostrum, eum tempore ut
                  dolorem! Corrupti consequuntur asperiores possimus! Dolore at
                  voluptas vitae, voluptatem obcaecati id quibusdam quo repellat
                  quia laborum unde quas vero delectus rem deleniti velit
                  ratione itaque, eum praesentium. Reprehenderit voluptatibus
                  suscipit illum eligendi corrupti et ea aliquid non magnam sed
                  vitae assumenda officiis nihil tempora, quo atque odio
                  explicabo ullam perspiciatis? Perferendis delectus ullam
                  dolores ipsa laboriosam cum possimus cumque quam praesentium
                  aliquam earum alias, eos porro officia soluta et ducimus.
                </p>
                <div className="flex w-4/5 justify-center border-b border-global/40"></div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold">Réalisation et bande-son</h2>
                <div className="flex w-full flex-col items-center justify-center">
                  <img
                    src={gameDetail?.background_image_additional as string}
                    alt={`Photo de ${gameDetail?.name}`}
                    className="h-[200px] w-[300px] object-cover sm:h-[300px] sm:w-4/5 lg:h-[400px]"
                    loading="lazy"
                  />
                  <p className="text-center text-sm italic">
                    Une OST magistrale
                  </p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus corrupti modi enim deleniti facere vero repudiandae
                  magnam? Repellendus dignissimos id illum eum nostrum nulla?
                  Fuga earum incidunt officiis, tempore voluptate placeat
                  recusandae deleniti non, eos odit, quisquam porro? Minima,
                  blanditiis voluptas facere id et reprehenderit! Dolore aliquam
                  temporibus alias facere, consequatur et quidem omnis culpa
                  dolores, aperiam itaque sint similique mollitia enim nesciunt
                  sit earum labore quos, rem placeat ipsum. Eveniet, corrupti
                  nostrum sapiente odit magni magnam alias facilis! Harum eum
                  provident quibusdam id eius ea nesciunt, deserunt pariatur
                  velit itaque dolores tempora unde labore nam obcaecati
                  mollitia adipisci odio dolorum, quae possimus laboriosam
                  impedit fugiat accusamus? Magni odit quam cupiditate illum
                  deleniti totam voluptatibus omnis dolorum, molestias
                  blanditiis nulla doloremque praesentium ullam inventore sequi
                  quis fugiat saepe, provident quo debitis atque sed ad iusto.
                  Nobis natus suscipit sunt laborum fugiat veritatis illum iure
                  pariatur aliquam minima dolorum voluptate aperiam voluptatum
                  atque tempore est esse architecto dicta delectus, non neque
                  quos laboriosam magni. Ullam aspernatur pariatur quo
                  voluptatem, autem qui ipsa. Nesciunt iusto consequuntur
                  voluptas vel! Optio ipsam quaerat, repudiandae ducimus nihil
                  repellat vel ullam enim maiores dignissimos recusandae odio ea
                  ad voluptate? Doloribus expedita rem illum, vero eaque soluta
                  incidunt sit reiciendis cupiditate magnam quibusdam? Ducimus
                  ratione vitae omnis. Perspiciatis dolores earum corporis culpa
                  nihil beatae voluptatibus exercitationem veniam eligendi
                  possimus, tenetur nesciunt quibusdam nostrum, eum tempore ut
                  dolorem! Corrupti consequuntur asperiores possimus! Dolore at
                  voluptas vitae, voluptatem obcaecati id quibusdam quo repellat
                  quia laborum unde quas vero delectus rem deleniti velit
                  ratione itaque, eum praesentium. Reprehenderit voluptatibus
                  suscipit illum eligendi corrupti et ea aliquid non magnam sed
                  vitae assumenda officiis nihil tempora, quo atque odio
                  explicabo ullam perspiciatis? Perferendis delectus ullam
                  dolores ipsa laboriosam cum possimus cumque quam praesentium
                  aliquam earum alias, eos porro officia soluta et ducimus.
                </p>
                <div className="flex w-4/5 justify-center border-b border-global/40"></div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold">Conclusion</h2>
                <div className="flex w-full flex-col items-center bg-global/95 p-2 text-light">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                    repudiandae eligendi mollitia facilis accusantium rem itaque
                    unde excepturi? Iusto voluptate dolore cupiditate quidem,
                    quibusdam id perferendis repellat numquam dolorum sunt hic,
                    at est distinctio dicta, ratione reprehenderit obcaecati?
                    Dolores, quibusdam vel fugit voluptatum tempora dolorum qui
                    similique delectus consequuntur mollitia!
                  </p>
                  <p className="text-xs">
                    <span className="text-xl font-semibold text-mainYellow">
                      17
                    </span>
                    ∕20
                  </p>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-center text-lg font-bold text-green-600 sm:text-2xl">
                    Points forts
                  </h2>
                  <ul className="flex flex-col gap-1">
                    <li className="flex gap-1">
                      <span className="font-bold text-green-600">+</span>
                      L'histoire palpitante
                    </li>
                    <li className="flex gap-1">
                      <span className="font-bold text-green-600">+</span>
                      Un gameplay aux petits oignons
                    </li>
                  </ul>
                </div>
                <div className="border-r border-global/40"></div>
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                    Points faibles
                  </h2>
                  <ul className="flex flex-col gap-1 pl-5">
                    <li className="flex gap-1">
                      <span className="font-bold text-red-600">-</span>
                      Trop facile
                    </li>
                    <li className="flex gap-1">
                      <span className="font-bold text-red-600">-</span>
                      Doublage vf en retrait
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </GameHeader>
      )}
    </>
  );
};
