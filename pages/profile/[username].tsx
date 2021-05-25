import * as React from "react";
import prisma from "lib/prisma";
import { Profile as ProfileType } from "@prisma/client";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { Card } from "antd";
import { Screen } from "components/Layout";
import { Profile, ProfileAvatar, ProfileContent } from "components/Profile";

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
          <Card title={`${profile.user.username}'s maps`}></Card>
        </div>
      </div>
    </Screen>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const usernames = await prisma.user.findMany({ select: { username: true } });
  const paths = usernames.map((username) => ({ params: username }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  { profile: ProfileType & { user: { username: string } } },
  { username: string }
> = async (context) => {
  const profile = await prisma.profile.findFirst({
    where: { user: { username: context.params.username } },
    include: { user: { select: { username: true } } },
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
