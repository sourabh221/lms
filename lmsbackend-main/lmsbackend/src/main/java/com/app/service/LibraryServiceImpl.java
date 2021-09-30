package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.LibraryRepository;
import com.app.dto.LibraryName_SerialNo_dto;
import com.app.pojos.Library;
import com.app.pojos.LibraryAddress;

@Service
@Transactional
public class LibraryServiceImpl implements ILibraryService {

	@Autowired
	public LibraryRepository libraryRepository ;
	
	 public LibraryServiceImpl() {
		System.out.println("in ctor of "+getClass().getName());
	}
	@Override
	public Library AddLibrary(Library lib) {
		System.out.println("in method of adding library of libraryservice "+lib.getLibraryName());
		try {
			Library lib1= libraryRepository.save(lib);
			System.out.println(lib1);
			return lib1;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public Library GetLibraryByEmail(String email) {
		System.out.println("in method GetLibraryByEmail of libraryservice "+email);
		try {
			Optional<Library> optional=libraryRepository.findByEmail(email);
			if(optional.isPresent()) {
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
		return null;
	}
	@Override
	public Library GetLibraryByEmailAndPwd(String email, String pwd) {
		
		System.out.println("in method GetLibraryByEmailAndPwd of libraryservice "+email);
		try {
			Optional<Library> optional=libraryRepository.findByEmailAndPwd(email,pwd);
			if(optional.isPresent()) {
				System.out.println(optional.get().getUsers());
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
		return null;
	}
	
	@Override
	public Library GetLibraryByEmailAndSerialNo(String email, UUID serialNo) {
		
		System.out.println("in method GetLibraryByEmailAndSerailNo of libraryservice "+email+" "+serialNo);
		try {
			Optional<Library> optional=libraryRepository.findByEmailAndSerialNo(email, serialNo);
			if(optional.isPresent()) {
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
		return null;
	}
	@Override
	public Library UpdateLibrary(Library lib, LibraryAddress address) {
		System.out.println("in method updateLibray of libraryservice "+lib.getEmail());
		try {
			Optional<Library> optional=libraryRepository.findByEmailAndSerialNo(lib.getEmail(),lib.getSerialNo());
			
			if(optional.isPresent()) {
				Library result=optional.get();
				result.setPhone(lib.getPhone());
				result.getAddr().setColonyName(address.getColonyName());
				result.getAddr().setBuildingName(address.getBuildingName());
				result.getAddr().setCity(address.getCity());
				result.getAddr().setState(address.getState());
				result.getAddr().setPincode(address.getPincode());
				return libraryRepository.save(result);
				
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
		return null;
	}
	@Override
	public Library GetLibraryBySerialNo(UUID serialNo) {
		System.out.println("in GetLibraryBySerialNo of "+getClass().getName()+" "+serialNo);
		try {
			Optional<Library> optional=libraryRepository.findBySerialNo(serialNo);
			if(optional.isPresent()) {
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	@Override
	public Library GetLibraryByLibraryName(String name) {
		System.out.println("in GetLibraryByLibraryName of "+getClass().getName()+" "+name);
		try {
			Optional<Library> optional=libraryRepository.findByLibraryName(name);
			if(optional.isPresent()) {
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	@Override
	public Library GetLibraryByPhone(String phone) {
		System.out.println("in GetLibraryByPhone of "+getClass().getName()+" "+phone);
		try {
			Optional<Library> optional=libraryRepository.findByPhone(phone);
			if(optional.isPresent()) {
				return optional.get();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	@Override
	public Library UpdateLibraryPwd(String email, String pwd) {
		System.out.println("in UpdateLibraryPwd of "+getClass().getName()+" "+email);
		try {
			Optional<Library> optional=libraryRepository.findByEmail(email);
			if(optional.isPresent()) {
				Library lib=optional.get();
				lib.setPwd(pwd);
				return libraryRepository.save(lib);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}

	@Override
	public List<LibraryName_SerialNo_dto> GetLibrarysNameAndSerialNo() {
		System.out.println("in method of GetLibrarysNameAndSerialNo of userservice ");
		try {
			/*Optional<List<Email_UUID_dto>> optional=libraryRepository.getLibraryNamesAndSerialNo();
			if(optional.isPresent()) {
				return optional.get();
			}*/
			return libraryRepository.getLibraryNamesAndSerialNo();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}

}
