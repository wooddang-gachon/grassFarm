import { raw } from "express";

export class UserProfileInfo {
  constructor(rawData) {
    this.login = rawData.login;
    this.html_url = rawData.html_url;
    this.name = rawData.name;
    this.avatar_url = rawData.avatar_url;
    this.email = rawData.email;
    this.twitter_username = rawData.twitter_username;
    this.public_repos = rawData.public_repos;
    this.public_gists = rawData.public_gists;
    this.followers = rawData.followers;
    this.following = rawData.following;
    this.created_at = rawData.created_at;
    this.company = rawData.company;
    this.blog = rawData.blog;
    this.location = rawData.location;
  }
}
export class UserRequestDto {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}

export class UserResponseDto {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
