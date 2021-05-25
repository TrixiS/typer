import * as React from "react";
import Image from "next/image";
import prisma from "lib/prisma";
import { Profile as ProfileType } from "@prisma/client";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { Card, Divider } from "antd";
import { Screen } from "components/Layout";

export type StaticPropsProfile = ProfileType & { user: { username: string } };

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: StaticPropsProfile;
}

export interface ProfileAvatarProps {
  src?: string;
}

function ProfileAvatar({ src }: ProfileAvatarProps) {
  return (
    <Image
      src={src ?? "/svg/user.svg"}
      layout="responsive"
      width="full"
      height="full"
    />
  );
}

function Profile({ profile, ...rest }: ProfileProps) {
  return (
    <div className="flex flex-row gap-x-4" {...rest}>
      <div className="flex flex-col w-1/4 h-1/3 lg:h-full justify-center">
        <ProfileAvatar src={profile.avatarUrl} />
      </div>
      <div className="flex flex-col w-3/4">
        <div className="h-1/1">
          <h2 className="text-2xl font-semibold">{profile.user.username}</h2>
          <h3 className="text-sm">{profile.status}</h3>
        </div>
        {profile.about && (
          <div className="h-2/3">
            <Divider className="h-1/12" />
            <div className="h-11/12">
              <h3 className="text-sm text-gray-700">{profile.about}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage({
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Screen first className="items-center">
      <div className="flex flex-col w-11/12 mt-4 gap-4 md:flex-row md:mt-8 md:gap-7">
        <div className="flex flex-col w-full md:w-1/2">
          <Card title={`${profile.user.username}'s profile`}>
            <Profile profile={profile} />
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
  { profile: StaticPropsProfile },
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
