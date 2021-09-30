package com.app.utils;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.util.Random;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;



public class UserUtils {
	public static int generateOTP() {
		Random random = new Random();
		int otp = 100000 + random.nextInt(900000);
		return otp;
	}
	public static long calculateFine(int days) {
		return 5*days;
	}
	
	public static Blob GetImage(String location,String imageName,String dummyImage) {
		try {
			Path  path;
			if(imageName!=null) {
				path = Paths.get(location, imageName);
				File temp=new File(path.toString());
				if(temp.exists()) {
					path = Paths.get(location, imageName);
					
				}else {
					 path = Paths.get(location, dummyImage);
				}
			}else {
				 path = Paths.get(location,dummyImage);
			}
				
				InputStreamResource input = new InputStreamResource(new FileInputStream(path.toFile()));
				ClassPathResource imageFile = new ClassPathResource(path.toString());
				byte[] imageBytes = org.springframework.util.StreamUtils.copyToByteArray(input.getInputStream());
				Blob blob = new SerialBlob(imageBytes);
				return blob;
		} catch (Exception e) {
			System.out.println("exception in getImage method ");
			System.out.println(e.getMessage());
		}
		return null;
	}
}