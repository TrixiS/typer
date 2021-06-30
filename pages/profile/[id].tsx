import * as React from "react";
import prisma from "lib/prisma";
import { Profile as ProfileDto, Map } from "@prisma/client";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { Card } from "antd";
import { Screen } from "components/Layout";
import { Profile, ProfileAvatar, ProfileContent } from "components/Profile";
import { MapCard } from "components/MapCard";

export default function ProfilePage({
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Screen first className="items-center">
      <div className="flex flex-col w-11/12 mt-4 gap-4 md:flex-row md:mt-8 md:gap-7">
        <div className="flex flex-col w-full md:w-1/2">
          <Card title={`${profile.user.username}'s profile`}>
            <Profile
              avatar={<ProfileAvatar src={profile.avatarUrl} />}
              content={
                <ProfileContent username={profile.user.username} {...profile} />
              }
            />
          </Card>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <Card title={`${profile.user.username}'s maps`}>
            {profile.user.maps.map((m) => (
              <MapCard map={m} />
            ))}
          </Card>
        </div>
      </div>
    </Screen>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await prisma.user.findMany({ select: { id: true } });
  const paths = ids.map((id) => ({ params: { id: id.id.toString() } }));
  return { paths, fallback: "blocking" }; // TODO: use just getServerSideProps ?
};

export const getStaticProps: GetStaticProps<
  { profile: ProfileDto & { user: { username: string; maps: Map[] } } },
  { id: string }
> = async (context) => {
  const userId = Number.parseInt(context.params.id);

  if (Number.isNaN(userId) || userId < 1) return { notFound: true };

  const profile = await prisma.profile.findFirst({
    where: { userId },
    include: { user: { select: { username: true, maps: true } } },
  });

  if (!profile)
    return {
      notFound: true,
    };

  return {
    props: { profile },
    revalidate: 60,
  };
};
